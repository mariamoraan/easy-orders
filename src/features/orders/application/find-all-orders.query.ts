import { OrdersFilters } from '../domain/orders-filters';
import { OrdersRepository } from '../domain/orders.repository';

export class FindAllOrdersQuery {
  constructor(private readonly ordersRepository: OrdersRepository) {}
  handle(companyId: string, filters: OrdersFilters) {
    return this.ordersRepository.findAll(companyId, filters);
  }
}
