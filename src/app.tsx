import { Outlet } from 'react-router-dom';
import { AuthProvider } from './core/routing/auth.context';

export const App = () => {
  return (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  );
};
