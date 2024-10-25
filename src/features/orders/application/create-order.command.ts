import { Order } from '../domain/order';
import { OrdersRepository } from '../domain/orders.repository';

export class CreateOrderCommand {
  constructor(private readonly ordersRepository: OrdersRepository) {}
  handle(order: Order) {
    return this.ordersRepository.create(order);
  }
}
