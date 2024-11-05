import { DateTime } from '@/core/datetime/datetime';
import { OrderStatus } from './order-status';
import { BillStatus } from './bill-state';

export interface Order {
  id: string;
  orderNum: number;
  creationDate: DateTime;
  deliverDate: DateTime;
  status: OrderStatus;
  clientName: string;
  clientPhone?: string;
  deliveryAddress?: string;
  clientId?: string;
  company: string;
  description: string;
  signal?: number;
  price?: number;
  billStatus?: BillStatus;
}
