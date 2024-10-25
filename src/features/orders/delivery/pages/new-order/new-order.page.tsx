import { bind } from '@/core/styles/bind';
import styles from './new-order.module.css';
import { Order } from '@/features/orders/domain/order';
import { OrderStatus } from '@/features/orders/domain/order-status';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useOrders } from '../../context/orders.provider';
import { useCompany } from '@/features/company/delivery/context/company.provider';
import { useAuth } from '@/features/auth/delivery/context/auth.context';
import { OrdersLocator } from '../../locator';
import { ProtectedUrls } from '@/core/routing/urls';
import { DateTime } from '@/core/datetime/datetime';
import { EditOrder } from '../../components/edit-order/edit-order.component';
import { useTranslate } from '@/core/i18n/hooks/use-translate.hook';
const cn = bind(styles);

export const NewOrderPage = () => {
  const { t } = useTranslate();
  const navigate = useNavigate();
  const { company } = useCompany();
  const { user } = useAuth();
  const { count, refetchOrders } = useOrders();
  const [isLoading, setIsLoading] = useState(false);
  const order: Order = {
    id: `${company.id}-${user?.uid}-${DateTime.fromNow().toIso()}`,
    orderNum: count + 1,
    creationDate: DateTime.fromNow(),
    deliverDate: DateTime.fromNow(),
    status: OrderStatus.PENDING,
    clientName: '',
    company: company.id,
    description: '',
  };
  const onSubmit = async (order: Order) => {
    setIsLoading(true);
    await OrdersLocator.getCreateOrderCommand().handle(order);
    await refetchOrders();
    setIsLoading(false);
    navigate(ProtectedUrls.HOME);
  };
  useEffect(() => {
    const setup = async () => await refetchOrders();
    setup();
  }, []);

  return (
    <EditOrder
      isLoading={isLoading}
      order={order}
      onSubmit={onSubmit}
      onCancel={() => navigate(ProtectedUrls.HOME)}
      title={t('new-order.new-order')}
      className={cn('wrapper')}
    />
  );
};
