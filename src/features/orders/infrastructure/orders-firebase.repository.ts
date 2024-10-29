import { Order } from '../domain/order';
import { OrdersRepository } from '../domain/orders.repository';
import {
  getDocs,
  query,
  collection,
  where,
  orderBy,
  getCountFromServer,
  doc,
  setDoc,
  getDoc,
} from 'firebase/firestore';
import { db } from '@/core/firebase';
import { DateTime } from '@/core/datetime/datetime';
import { OrdersFilters } from '../domain/orders-filters';

export class OrdersFirebaseRepository implements OrdersRepository {
  public async findAll(companyId: string, filters: OrdersFilters): Promise<Order[]> {
    const q = query(
      collection(db, 'orders'),
      orderBy('deliverDate'),
      where('company', '==', companyId),
      where('status', 'in', filters.status),
      where('deliverDate', '>=', filters.deliveryDate.from?.toMillis() || 0),
      filters.deliveryDate.to
        ? where('deliverDate', '<=', filters.deliveryDate.to.toMillis())
        : where('company', '==', companyId),
    );
    const querySnapshot = await getDocs(q);
    const orders: Order[] = [];

    querySnapshot.forEach((doc) => {
      const orderData = doc.data();
      const order: Order = {
        id: orderData.id,
        orderNum: orderData.orderNum,
        creationDate: DateTime.fromMillis(orderData.creationDate),
        deliverDate: DateTime.fromMillis(orderData.deliverDate),
        status: orderData.status,
        clientName: orderData.clientName || '',
        clientPhone: orderData.clientPhone || '',
        deliveryAddress: orderData.deliveryAddress || '',
        clientId: orderData.clientId || '',
        company: orderData.company,
        description: orderData.description || '',
        signal: orderData.signal || 0,
        price: orderData.price || 0,
      };
      orders.push(order);
    });
    return orders;
  }
  public async findById(orderId: string): Promise<Order | undefined> {
    const docRef = doc(db, 'orders', orderId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const orderData = docSnap.data();
      const order: Order = {
        id: orderData.id,
        orderNum: orderData.orderNum,
        creationDate: DateTime.fromMillis(orderData.creationDate),
        deliverDate: DateTime.fromMillis(orderData.deliverDate),
        status: orderData.status,
        clientName: orderData.clientName || '',
        clientPhone: orderData.clientPhone || '',
        deliveryAddress: orderData.deliveryAddress || '',
        clientId: orderData.clientId || '',
        company: orderData.company,
        description: orderData.description || '',
        signal: orderData.signal || 0,
        price: orderData.price || 0,
      };
      return order;
    }
    return undefined;
  }
  public async count(companyId: string): Promise<number> {
    const coll = query(collection(db, 'orders'), where('company', '==', companyId));
    const snapshot = await getCountFromServer(coll);
    return snapshot.data().count || 0;
  }

  public async create(order: Order): Promise<void> {
    const docRef = doc(db, 'orders', order.id);
    await setDoc(docRef, {
      ...order,
      creationDate: order.creationDate.toMillis(),
      deliverDate: order.deliverDate.toMillis(),
    });
  }
  public async update(order: Order): Promise<undefined> {
    const docRef = doc(db, 'orders', order.id);
    const updatedOrder = {
      id: order.id || null,
      orderNum: order.orderNum || null,
      creationDate: order.creationDate.toMillis() || null,
      deliverDate: order.deliverDate.toMillis() || null,
      status: order.status || null,
      clientName: order.clientName || null,
      clientPhone: order.clientPhone || null,
      deliveryAddress: order.deliveryAddress || null,
      clientId: order.clientId || null,
      company: order.company || null,
      description: order.description || null,
      signal: order.signal || null,
      price: order.price || null,
    };
    setDoc(docRef, updatedOrder);
  }
}
