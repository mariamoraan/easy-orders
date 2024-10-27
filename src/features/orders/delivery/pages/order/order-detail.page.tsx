import { bind } from '@/core/styles/bind';
import styles from './order-detail.module.css';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { ActionButton } from '@/core/components/action-button/action-button.component';
import { ArrowBackIcon, DownloadIcon, EditIcon } from '@/core/icons';
import { useTranslate } from '@/core/i18n/hooks/use-translate.hook';
import { useEffect, useState } from 'react';
import { Order } from '@/features/orders/domain/order';
import { OrdersLocator } from '../../locator';
import { ProtectedUrls } from '@/core/routing/urls';
import { Dropdown } from '@/core/components/dropdown/dropdown.component';
import { OrderDetail } from '../../components/order-detail/order-detail.component';
import { EditOrder } from '../../components/edit-order/edit-order.component';
import { useOrders } from '../../context/orders.provider';
import { OrderSkeleton } from '../../components/order-skeleton/order-skeleton.component';
import { pdf } from '@react-pdf/renderer';
import { useCompany } from '@/features/company/delivery/context/company.provider';
import { useAuth } from '@/features/auth/delivery/context/auth.context';
import { PrintableOrder } from '../../components/printable-order/printable-order.component';

const cn = bind(styles);

export const OrderDetailPage = () => {
  const { t } = useTranslate();

  const { orderId } = useParams();
  const navigate = useNavigate();
  const { company } = useCompany();
  const { user } = useAuth();

  const [order, setOrder] = useState<Order | undefined>();
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { refetchOrders } = useOrders();

  const toggleEdit = () => setIsEditing((prev) => !prev);
  const setup = async (orderId: string) => {
    const res = await OrdersLocator.getFindOrderByIdQuery().handle(orderId);
    if (!res) setError('Order Not Exists');
    setOrder(res);
  };

  const onSaveOrder = async (order: Order) => {
    setIsLoading(true);
    await OrdersLocator.getUpdateOrderCommand().handle(order);
    await setup(order.id);
    refetchOrders();
    setIsEditing(false);
    setIsLoading(false);
  };

  const saveAs = async (blob: Blob, fileName: string) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    document.body.appendChild(a);
    a.href = url;
    a.download = fileName;
    a.click();
    URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  const onDownloadOrder = async (callback?: () => void) => {
    if (!order || !company || !user) return;
    const blob = await pdf(<PrintableOrder order={order} company={company} user={user} />).toBlob();
    saveAs(blob, `pedido-${order.orderNum}`);
    callback && callback();
  };

  useEffect(() => {
    if (!orderId) return;
    setup(orderId);
  }, [orderId]);

  if (error) {
    return <Navigate to={ProtectedUrls.HOME} />;
  }

  if (!order || !company || !user) {
    return <OrderSkeleton />;
  }

  if (isEditing)
    return (
      <EditOrder
        title={`${t('order-detail.order')} ${order.orderNum}`}
        onCancel={() => setIsEditing(false)}
        onSubmit={onSaveOrder}
        order={order}
        isLoading={isLoading}
        className={cn('wrapper')}
      />
    );

  return (
    <div className={cn('wrapper')}>
      <div className={cn('header')}>
        <ActionButton onClick={() => navigate(-1)} label={<ArrowBackIcon />} />
        <h2 className={cn('title')}>
          {t('order-detail.order')} {order.orderNum}
        </h2>
        <Dropdown dropdownClassName={cn('dropdown')} disabled={isEditing}>
          {({ setIsOpen }) => (
            <>
              <ActionButton
                className={cn('dropdown__option')}
                onClick={toggleEdit}
                label={'Editar'}
                endIcon={<EditIcon />}
              />
              <ActionButton
                className={cn('dropdown__option')}
                onClick={() => onDownloadOrder(() => setIsOpen(false))}
                label={'Descargar'}
                endIcon={<DownloadIcon />}
              />
            </>
          )}
        </Dropdown>
      </div>
      <OrderDetail order={order} />
    </div>
  );
};
