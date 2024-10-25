import { Outlet } from 'react-router-dom';
import { AuthProvider } from './features/auth/delivery/context/auth.context';
import '@/core/firebase';
import { CompanyProvider } from './features/company/delivery/context/company.provider';
import { OrdersProvider } from './features/orders/delivery/context/orders.provider';
import { useEffect, useRef } from 'react';

export const App = () => {
  const scrollInto = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!scrollInto?.current) return;
    scrollInto?.current.scrollIntoView();
  }, [scrollInto]);
  return (
    <AuthProvider>
      <CompanyProvider>
        <OrdersProvider>
          <div ref={scrollInto}>
            <Outlet />
          </div>
        </OrdersProvider>
      </CompanyProvider>
    </AuthProvider>
  );
};
