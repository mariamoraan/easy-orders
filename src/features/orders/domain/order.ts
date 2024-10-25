import { DateTime } from '@/core/datetime/datetime';
import { OrderStatus } from './order-status';

export interface Order {
  id: string;
  orderNum: number;
  creationDate: DateTime;
  deliverDate: DateTime;
  status: OrderStatus;
  clientName: string;
  clientPhone?: string;
  clientAddress?: string;
  clientId?: string;
  company: string;
  description: string;
  signal?: string;
}
