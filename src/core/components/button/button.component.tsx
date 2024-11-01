import { bind } from '@/core/styles/bind';
import styles from './button.module.css';
import { LoaderIcon } from '@/core/icons';
const cn = bind(styles);

interface Props {
  label: string | React.ReactNode;
  onClick?: () => void;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  fullWidth?: boolean;
  center?: boolean;
  loading?: boolean;
  styleType?: 'icon' | 'outlined-icon';
  small?: boolean;
  mark?: React.ReactNode;
}

export const Button = (props: Props) => {
  const {
    label,
    onClick,
    startIcon,
    endIcon,
    type = 'submit',
    className = '',
    fullWidth = false,
    center = false,
    loading = false,
    styleType,
    small,
    mark,
  } = props;

  if (loading)
    return (
      <button
        type={type}
        className={cn('button', className, {
          'button--full-width': fullWidth,
          'button--center': center,
          'button--icon': styleType === 'icon',
          'button--outlined-icon': styleType === 'outlined-icon',
          'button--small': small,
        })}
        onClick={onClick}
      >
        <LoaderIcon className={cn('loader')} />
      </button>
    );
  return (
    <button
      type={type}
      className={cn('button', className, {
        'button--full-width': fullWidth,
        'button--center': center,
        'button--icon': styleType === 'icon',
        'button--outlined-icon': styleType === 'outlined-icon',
        'button--small': small,
      })}
      onClick={onClick}
    >
      {startIcon}
      {label}
      {endIcon}
      {mark}
    </button>
  );
};
