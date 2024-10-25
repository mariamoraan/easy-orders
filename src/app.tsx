import { Outlet } from 'react-router-dom';
import { AuthProvider } from './features/auth/delivery/context/auth.context';
import '@/core/firebase';
import { CompanyProvider } from './features/company/delivery/context/company.provider';
import { OrdersProvider } from './features/orders/delivery/context/orders.provider';

export const App = () => {
  return (
    <AuthProvider>
      <CompanyProvider>
        <OrdersProvider>
          <Outlet />
        </OrdersProvider>
      </CompanyProvider>
    </AuthProvider>
  );
};
