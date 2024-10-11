import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './auth.context';
import { Urls } from './urls';

export const ProtectedRoutesWrapper = () => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to={Urls.LOGIN} />;

  return <Outlet />;
};
