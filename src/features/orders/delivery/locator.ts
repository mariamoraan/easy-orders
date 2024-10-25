import { CountOrdersQuery } from '../application/count-orders.query';
import { CreateOrderCommand } from '../application/create-order.command';
import { FindAllOrdersQuery } from '../application/find-all-orders.query';
import { FindOrderByIdQuery } from '../application/find-order-by-id.query';
import { UpdateOrderCommand } from '../application/update-order.command';
import { OrdersRepository } from '../domain/orders.repository';
import { OrdersFirebaseRepository } from '../infrastructure/orders-firebase.repository';
export class OrdersLocator {
  static getRepository(): OrdersRepository {
    return new OrdersFirebaseRepository();
  }
  static getFindAllOrdersQuery() {
    return new FindAllOrdersQuery(this.getRepository());
  }
  static getFindOrderByIdQuery() {
    return new FindOrderByIdQuery(this.getRepository());
  }
  static getCountOrdersQuery() {
    return new CountOrdersQuery(this.getRepository());
  }
  static getCreateOrderCommand() {
    return new CreateOrderCommand(this.getRepository());
  }
  static getUpdateOrderCommand() {
    return new UpdateOrderCommand(this.getRepository());
  }
}
