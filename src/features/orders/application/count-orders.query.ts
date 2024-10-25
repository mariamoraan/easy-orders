import { OrdersRepository } from '../domain/orders.repository';

export class CountOrdersQuery {
  constructor(private readonly ordersRepository: OrdersRepository) {}
  handle(companyId: string) {
    return this.ordersRepository.count(companyId);
  }
}
