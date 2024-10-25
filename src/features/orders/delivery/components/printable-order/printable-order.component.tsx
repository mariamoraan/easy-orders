import { bind } from '@/core/styles/bind';
import styles from './printable-order.module.css';
import { Order } from '@/features/orders/domain/order';
import { OrderDetail } from '../order-detail/order-detail.component';
import { useTranslate } from '@/core/i18n/hooks/use-translate.hook';
import { useRef } from 'react';
const cn = bind(styles);

interface Props {
  order: Order;
  className?: string;
}

export const PrintableOrder = (props: Props) => {
  const { order, className } = props;
  const { t } = useTranslate();
  const targetRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={targetRef} className={cn('wrapper', className)}>
      <div className={cn('header')}>
        <h2 className={cn('title')}>{t('order-detail.order')}</h2>
      </div>
      <div className={cn('content')}>
        <OrderDetail order={order} />
      </div>
    </div>
  );
};
