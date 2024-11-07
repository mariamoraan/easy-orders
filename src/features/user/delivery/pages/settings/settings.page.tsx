import { bind } from '@/core/styles/bind';
import styles from './settings.module.css';
import { ActionButton } from '@/core/components/action-button/action-button.component';
import {
  AccountIcon,
  ArrowBackIcon,
  ArrowForwardIcon,
  CreditCardIcon,
  DisplayIcon,
  LockIcon,
  LogoutIcon,
  NotificationIcon,
} from '@/core/icons';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/features/auth/delivery/context/auth.context';
const cn = bind(styles);

const links = [
  { Icon: AccountIcon, label: 'Account' },
  { Icon: NotificationIcon, label: 'Notification' },
  { Icon: DisplayIcon, label: 'Display' },
  { Icon: LockIcon, label: 'Privacy' },
  { Icon: CreditCardIcon, label: 'Payment' },
];

export const SettingsPage = () => {
  const navigate = useNavigate();
  const goBack = () => navigate(-1);
  const { logout } = useAuth();

  return (
    <div className={cn('wrapper')}>
      <div className={cn('header')}>
        <ActionButton label={<ArrowBackIcon />} onClick={goBack} className={cn('header__go-back-icon')} />
        <h2 className={cn('title')}>Settings</h2>
      </div>
      <ul className={cn('links')}>
        {links.map(({ Icon, label }) => (
          <li key={label} className={cn('links__li')}>
            <Icon size={18} />
            <p className={cn('links__li__label')}>{label}</p>
            <ArrowForwardIcon className={cn('links__li__icon')} />
          </li>
        ))}
        <li className={cn('links__li')} onClick={logout}>
          <LogoutIcon size={18} />
          <p className={cn('links__li__label')}>Logout</p>
          <ArrowForwardIcon className={cn('links__li__icon')} />
        </li>
      </ul>
    </div>
  );
};
