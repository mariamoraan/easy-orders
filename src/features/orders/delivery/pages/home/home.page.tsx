import { bind } from '@/core/styles/bind';
import styles from './home.module.css';
import { useAuth } from '@/core/routing/auth.context';
const cn = bind(styles);

export const HomePage = () => {
  const { logout } = useAuth();
  return (
    <div className={cn('page')}>
      <h1>Home</h1>
      <button onClick={logout}>Logout</button>
    </div>
  );
};
