import { DateTime } from '@/core/datetime/datetime';
import { OrderStatus } from './order-status';

export interface OrdersFilters {
  status: OrderStatus[];
  deliveryDate: { from?: DateTime; to?: DateTime };
}
