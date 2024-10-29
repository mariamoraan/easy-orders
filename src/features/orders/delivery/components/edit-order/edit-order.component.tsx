import { bind } from '@/core/styles/bind';
import styles from './edit-order.module.css';
import { Order } from '@/features/orders/domain/order';
import { OrderStatus } from '@/features/orders/domain/order-status';
import { useTranslate } from '@/core/i18n/hooks/use-translate.hook';
import { Input } from '@/core/components/form/input/input.component';
import { useState } from 'react';
import { DateTime } from '@/core/datetime/datetime';
import { ActionButton } from '@/core/components/action-button/action-button.component';
import { CancelIcon, SaveIcon } from '@/core/icons';
import { StatusSelector } from '../status-selector/status-selector.component';
import { InputNumber } from '@/core/components/form/input-number/input-number.component';
import { useAuth } from '@/features/auth/delivery/context/auth.context';
import { getTotalPrice } from '@/features/orders/domain/utils';
const cn = bind(styles);

interface Props {
  order: Order;
  onSubmit?: (order: Order) => void;
  onCancel?: () => void;
  isLoading?: boolean;
  title: string;
  className?: string;
}

const voidOrder: Order = {
  id: '',
  orderNum: 0,
  creationDate: DateTime.fromNow(),
  deliverDate: DateTime.fromNow(),
  status: OrderStatus.PENDING,
  clientName: '',
  clientPhone: '',
  deliveryAddress: '',
  clientId: '',
  company: '',
  description: '',
  signal: 0,
  price: 0,
};

export const EditOrder = (props: Props) => {
  const { order, onSubmit, onCancel, title, isLoading = false, className } = props;
  const { t } = useTranslate();
  const { user } = useAuth();
  const [editedOrder, setEditedOrder] = useState<Order>({ ...voidOrder, ...order });
  return (
    <div className={cn(className)}>
      <div className={cn('header')}>
        <ActionButton onClick={onCancel} label={<CancelIcon />} />
        <h2 className={cn('title')}>{title}</h2>
        <ActionButton
          type="button"
          loading={isLoading}
          onClick={() => onSubmit && onSubmit(editedOrder)}
          label={<SaveIcon />}
        />
      </div>
      <div className={cn('content')}>
        <div className={cn('info')}>
          <p className={cn('section-title')}>Cliente</p>
          <div className={cn('info-row')}>
            <p className={cn('info-row__title')}>{t('order-detail.client-name')}</p>
            <Input
              value={editedOrder.clientName}
              onChange={(clientName: string) => setEditedOrder((prev) => ({ ...prev, clientName }))}
              className={cn('info-row__content')}
            />
          </div>
          <div className={cn('info-row')}>
            <p className={cn('info-row__title')}>{t('order-detail.client-phone')}</p>
            <Input
              value={editedOrder.clientPhone}
              onChange={(clientPhone: string) => setEditedOrder((prev) => ({ ...prev, clientPhone }))}
              className={cn('info-row__content')}
            />
          </div>
        </div>
        <div className={cn('info')}>
          <p className={cn('section-title')}>Pedido</p>
          <div className={cn('info-row')}>
            <p className={cn('info-row__title')}>{t('order-detail.creation-date')}</p>
            <p className={cn('info-row__content', 'disabled')}>{order.creationDate.toFormat() || '-'}</p>
          </div>
          <div className={cn('info-row')}>
            <p className={cn('info-row__title')}>{t('order-detail.daliver-date')}</p>
            <input
              type="date"
              className={cn('deliver-date-input')}
              value={editedOrder.deliverDate.toFormat('yyyy-MM-dd') || DateTime.fromNow().toFormat('yyyy-MM-dd')}
              onChange={(e) =>
                setEditedOrder((prev) => ({
                  ...prev,
                  deliverDate: DateTime.fromIso(new Date(e.target.value).toISOString()),
                }))
              }
            />
          </div>
          <div className={cn('info-row')}>
            <p className={cn('info-row__title')}>{t('order-detail.state')}</p>
            <StatusSelector
              defaultValue={order.status}
              onChange={(option) =>
                setEditedOrder((prev) => ({
                  ...prev,
                  status: (option?.value as OrderStatus) || OrderStatus.PENDING,
                }))
              }
            />
          </div>
          <div className={cn('info-row')}>
            <p className={cn('info-row__title')}>{t('order-detail.delivery-address')}</p>
            <Input
              value={editedOrder.deliveryAddress}
              onChange={(deliveryAddress: string) =>
                setEditedOrder((prev) => ({ ...prev, deliveryAddress: deliveryAddress }))
              }
              className={cn('info-row__content')}
            />
          </div>
          <div className={cn('info-row')}>
            <p className={cn('info-row__title')}>
              {t('order-detail.sign')} ({user?.currency || '€'})
            </p>
            <InputNumber
              value={editedOrder.signal}
              onChange={(signal: number) => setEditedOrder((prev) => ({ ...prev, signal }))}
              className={cn('info-row__content')}
            />
          </div>
          <div className={cn('info-row')}>
            <p className={cn('info-row__title')}>
              {t('order-detail.price')} ({user?.currency || '€'})
            </p>
            <InputNumber
              value={editedOrder.price}
              onChange={(price: number) => setEditedOrder((prev) => ({ ...prev, price }))}
              className={cn('info-row__content')}
            />
          </div>
          <div className={cn('info-row')}>
            <p className={cn('info-row__title')}>
              {t('order-detail.total')} ({user?.currency || '€'})
            </p>
            <InputNumber
              value={getTotalPrice({ price: editedOrder.price, signal: editedOrder.signal })}
              className={cn('info-row__content')}
              disabled
            />
          </div>
        </div>
        <div>
          <p className={cn('section-title')}>Detalle</p>
          <textarea
            value={editedOrder.description}
            onChange={(e) => setEditedOrder((prev) => ({ ...prev, description: e.target.value }))}
            rows={8}
            className={cn('description')}
          />
        </div>
      </div>
    </div>
  );
};
