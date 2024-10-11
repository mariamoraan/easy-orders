import { bind } from '@/core/styles/bind';
import styles from './login.module.css';
import { useAuth } from '@/core/routing/auth.context';
import { Navigate } from 'react-router-dom';
import { ProtectedUrls } from '@/core/routing/urls';
const cn = bind(styles);

export const LoginPage = () => {
  const { isAuthenticated, login } = useAuth();
  if (isAuthenticated) return <Navigate to={ProtectedUrls.HOME} />;
  return (
    <div className={cn('page')}>
      <h1>Login</h1>
      <button onClick={login}>Login</button>
    </div>
  );
};
