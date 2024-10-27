import { bind } from '@/core/styles/bind';
import styles from './status-tag.module.css';
import { OrderStatus } from '@/features/orders/domain/order-status';
import { useTranslate } from '@/core/i18n/hooks/use-translate.hook';
import { CancelIcon, DeliveredIcon, PendantIcon, ReadyIcon } from '@/core/icons';
const cn = bind(styles);

interface Props {
  status: OrderStatus;
}

export const StatusColors: { [key in OrderStatus]: string } = {
  [OrderStatus.PENDING]: 'orange',
  [OrderStatus.READY]: 'purple',
  [OrderStatus.DELIVERED]: 'green',
  [OrderStatus.CANCELLED]: 'red',
};

export const OrderStatusIcon: { [key in OrderStatus]: React.ReactNode } = {
  [OrderStatus.PENDING]: <PendantIcon />,
  [OrderStatus.READY]: <ReadyIcon />,
  [OrderStatus.DELIVERED]: <DeliveredIcon />,
  [OrderStatus.CANCELLED]: <CancelIcon />,
};

export const StatusTag = (props: Props) => {
  const { status } = props;
  const { t } = useTranslate();
  return (
    <p className={cn('order-status-tag', `order-status-tag--${status}`)}>
      {OrderStatusIcon[status]} {t(`order.status.${status}`)}
    </p>
  );
};
