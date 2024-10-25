import { OrdersRepository } from '../domain/orders.repository';

export class FindOrderByIdQuery {
  constructor(private readonly ordersRepository: OrdersRepository) {}
  handle(orderId: string) {
    return this.ordersRepository.findById(orderId);
  }
}
