import { bind } from '@/core/styles/bind';
import styles from './printable-order.module.css';
import { Order } from '@/features/orders/domain/order';
import { OrderDetail } from '../order-detail/order-detail.component';
import { useRef } from 'react';
import { useCompany } from '@/features/company/delivery/context/company.provider';
const cn = bind(styles);

interface Props {
  order: Order;
  className?: string;
}

export const PrintableOrder = (props: Props) => {
  const { order, className } = props;
  const { company } = useCompany();
  const targetRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={targetRef} className={cn('wrapper', className)}>
      <div className={cn('header')}>
        {company.logoUrl && <img className={cn('logo')} src={company.logoUrl} />}
        <h2 className={cn('title')}>{company.name}</h2>
      </div>
      <div className={cn('content')}>
        <OrderDetail order={order} />
      </div>
    </div>
  );
};
