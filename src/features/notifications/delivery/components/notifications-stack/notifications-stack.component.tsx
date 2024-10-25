import { bind } from '@/core/styles/bind';
import { useNotifications } from '../../context/notifications.provider';
import styles from './notifications-stack.module.css';
const cn = bind(styles);

export const NotificationsStack = () => {
  const { notifications } = useNotifications();
  return (
    <ul className={cn('notifications-stack')}>
      {notifications.map((notification) => (
        <li key={notification.createdAt?.toIso()} className={cn('notifications-stack--li')}>
          <p>{notification.message}</p>
        </li>
      ))}
    </ul>
  );
};
