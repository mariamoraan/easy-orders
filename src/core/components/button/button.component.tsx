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
  styleType?: 'icon';
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
  } = props;

  if (loading)
    return (
      <button
        type={type}
        className={cn('button', className, {
          'button--full-width': fullWidth,
          'button--center': center,
          'button--icon': styleType === 'icon',
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
      })}
      onClick={onClick}
    >
      {startIcon}
      {label}
      {endIcon}
    </button>
  );
};
