import { Order } from '../domain/order';
import { OrdersRepository } from '../domain/orders.repository';

export class UpdateOrderCommand {
  constructor(private readonly ordersRepository: OrdersRepository) {}
  handle(order: Order) {
    return this.ordersRepository.update(order);
  }
}
