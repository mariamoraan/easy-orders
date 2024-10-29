import { bind } from '@/core/styles/bind';
import { useTranslate } from '@/core/i18n/hooks/use-translate.hook';
import styles from './order-detail.module.css';
import { Order } from '@/features/orders/domain/order';
import { StatusTag } from '../status-tag/status-tag.component';
import { useAuth } from '@/features/auth/delivery/context/auth.context';
import { getTotalPrice } from '@/features/orders/domain/utils';
const cn = bind(styles);

interface Props {
  order: Order;
}

export const OrderDetail = (props: Props) => {
  const { order } = props;
  const { t } = useTranslate();
  const { user } = useAuth();

  return (
    <div className={cn('content')}>
      <div className={cn('info')}>
        <p className={cn('section-title')}>Cliente</p>
        <div className={cn('info-row')}>
          <p className={cn('info-row__title')}>{t('order-detail.client-name')}</p>
          <p className={cn('info-row__content')}>{order.clientName || '-'}</p>
        </div>
        <div className={cn('info-row')}>
          <p className={cn('info-row__title')}>{t('order-detail.client-phone')}</p>
          <p className={cn('info-row__content')}>{order.clientPhone || '-'}</p>
        </div>
      </div>
      <div className={cn('info')}>
        <p className={cn('section-title')}>Pedido</p>
        <div className={cn('info-row')}>
          <p className={cn('info-row__title')}>{t('order-detail.creation-date')}</p>
          <p className={cn('info-row__content')}>{order.creationDate.toFormat() || '-'}</p>
        </div>
        <div className={cn('info-row')}>
          <p className={cn('info-row__title')}>{t('order-detail.daliver-date')}</p>
          <p className={cn('info-row__content')}>{order.deliverDate.toFormat() || '-'}</p>
        </div>
        <div className={cn('info-row')}>
          <p className={cn('info-row__title')}>{t('order-detail.state')}</p>
          <div className={cn('info-row__content')}>
            <StatusTag status={order.status} />
          </div>
        </div>
        <div className={cn('info-row')}>
          <p className={cn('info-row__title')}>{t('order-detail.delivery-address')}</p>
          <p className={cn('info-row__content')}>{order.deliveryAddress || '-'}</p>
        </div>
        <div className={cn('info-row')}>
          <p className={cn('info-row__title')}>{t('order-detail.sign')}</p>
          <p className={cn('info-row__content')}>
            {order.signal || '-'} {user?.currency || '€'}
          </p>
        </div>
        <div className={cn('info-row')}>
          <p className={cn('info-row__title')}>{t('order-detail.price')}</p>
          <p className={cn('info-row__content')}>
            {order.price || '-'} {user?.currency || '€'}
          </p>
        </div>
        <div className={cn('info-row')}>
          <p className={cn('info-row__title', 'bold')}>{t('order-detail.total')}</p>
          <p className={cn('info-row__content')}>
            {getTotalPrice({ price: order.price, signal: order.signal })} {user?.currency || '€'}
          </p>
        </div>
      </div>
      {order.description && (
        <div>
          <p className={cn('section-title')}>Detalle</p>
          <p className={cn('description')}>{order.description}</p>
        </div>
      )}
    </div>
  );
};
