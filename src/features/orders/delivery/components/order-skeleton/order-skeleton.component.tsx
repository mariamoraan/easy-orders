import { Skeleton } from '@/core/components/skeleton/skeleton.component';
import styles from './order-skeleton.module.css';
import { bind } from '@/core/styles/bind';
const cn = bind(styles);

export const OrderSkeleton = () => {
  return (
    <div className={cn('wrapper')}>
      <Skeleton width={250} className={cn('centered')} />
      <div className={cn('group')}>
        <Skeleton width={150} />
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton />
      </div>
      <div className={cn('group')}>
        <Skeleton width={150} />
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton />
      </div>
      <div className={cn('group')}>
        <Skeleton width={150} />
        <Skeleton height={300} />
      </div>
    </div>
  );
};
