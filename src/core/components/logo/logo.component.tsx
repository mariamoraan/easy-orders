import LogoImage from '@/assets/icon_1024x1024.png';
import styles from './logo.module.css';
import { bind } from '@/core/styles/bind';
const cn = bind(styles);

export const Logo = () => {
  return (
    <div className={cn('logo')}>
      <img className={cn('logo__image')} src={LogoImage} />
      <p className={cn('logo_text')}>Easy Orders</p>
    </div>
  );
};
