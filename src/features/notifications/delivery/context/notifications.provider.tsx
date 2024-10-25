import { DateComparison, DateTime } from '@/core/datetime/datetime';
import { createContext, useContext, useEffect, useState } from 'react';
import { NotificationsStack } from '../components/notifications-stack/notifications-stack.component';
import { useInterval } from '@/core/hooks/use-interval';

type Notification = {
  message: string;
  createdAt?: DateTime;
};

interface NotificationsState {
  notify: (notification: Notification) => void;
  notifications: Notification[];
}

const NotificationsContext = createContext<NotificationsState>({
  notify: function (): void {
    throw new Error('Function not implemented.');
  },
  notifications: [],
});

const MAX_TIME = 5;

export const NotificationsProvider = ({ children }: React.PropsWithChildren) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const manageNotifications = () => {
    if (!notifications?.length) return;
    const now = DateTime.fromNow();
    setNotifications((prev) =>
      prev.filter(
        (notification) =>
          notification.createdAt &&
          DateTime.compare(now, notification.createdAt.plusSeconds(MAX_TIME)) !== DateComparison.MAYOR,
      ),
    );
  };
  const notify = (notification: Notification) =>
    setNotifications((prev) => [...prev, { ...notification, createdAt: DateTime.fromNow() }]);
  useEffect(() => {
    const intervalId = setInterval(() => manageNotifications(), 1000);
    return () => clearInterval(intervalId);
  }, []);

  useInterval(manageNotifications, MAX_TIME * 1000);

  return (
    <NotificationsContext.Provider value={{ notify, notifications }}>
      {children}
      <NotificationsStack />
    </NotificationsContext.Provider>
  );
};

export const useNotifications = () => useContext(NotificationsContext);
