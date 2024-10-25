import { Order } from './order';
import { OrdersFilters } from './orders-filters';

export interface OrdersRepository {
  findAll(companyId: string, filters: OrdersFilters): Promise<Order[]>;
  create(order: Order): Promise<void>;
  count(companyId: string): Promise<number>;
  findById(orderId: string): Promise<Order | undefined>;
  update(order: Order): Promise<undefined>;
}
