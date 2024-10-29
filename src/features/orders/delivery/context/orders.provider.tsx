import React, { createContext, useContext, useEffect, useState } from 'react';
import { Order } from '../../domain/order';
import { useCompany } from '@/features/company/delivery/context/company.provider';
import { OrdersLocator } from '../locator';
import { OrdersFilters } from '../../domain/orders-filters';
import { OrderStatus } from '../../domain/order-status';
import { DateTime } from '@/core/datetime/datetime';

interface IOrdersContext {
  count: number;
  orders: Order[];
  setOrders: React.Dispatch<React.SetStateAction<Order[]>>;
  refetchOrders: () => void;
  filters: OrdersFilters;
  setFilters: React.Dispatch<React.SetStateAction<OrdersFilters>>;
}

export const OrdersContext = createContext<IOrdersContext>({
  count: 0,
  orders: [],
  setOrders: function (): void {
    throw new Error('Function not implemented.');
  },
  refetchOrders: function (): void {
    throw new Error('Function not implemented.');
  },
  filters: {
    status: [OrderStatus.DELIVERED, OrderStatus.PENDING, OrderStatus.READY],
    deliveryDate: {
      from: DateTime.fromNow(),
    },
  },
  setFilters: function (): void {
    throw new Error('Function not implemented.');
  },
});

export const OrdersProvider = ({ children }: React.PropsWithChildren) => {
  const { company } = useCompany();
  const [orders, setOrders] = useState<Order[]>([]);
  const [count, setCount] = useState<number>(0);
  const [filters, setFilters] = useState<OrdersFilters>({
    status: [OrderStatus.DELIVERED, OrderStatus.PENDING, OrderStatus.READY],
    deliveryDate: {
      from: DateTime.fromNow(),
    },
  });
  const refetchOrders = async () => {
    const companyOrders = await OrdersLocator.getFindAllOrdersQuery().handle(company.id, filters);
    const ordersCount = await OrdersLocator.getCountOrdersQuery().handle(company.id);
    setOrders(companyOrders);
    setCount(ordersCount);
  };

  useEffect(() => {
    const setup = async () => {
      if (!company || !company.id) return;
      const companyOrders = await OrdersLocator.getFindAllOrdersQuery().handle(company.id, filters);
      const ordersCount = await OrdersLocator.getCountOrdersQuery().handle(company.id);
      setOrders(companyOrders);
      setCount(ordersCount);
    };
    setup();
  }, [company.id]);

  useEffect(() => {
    refetchOrders();
  }, [filters.status, filters.deliveryDate]);

  return (
    <OrdersContext.Provider value={{ orders, setOrders, count, refetchOrders, filters, setFilters }}>
      {children}
    </OrdersContext.Provider>
  );
};

export const useOrders = () => useContext(OrdersContext);
