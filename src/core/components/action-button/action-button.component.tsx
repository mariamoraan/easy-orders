import { bind } from '@/core/styles/bind';
import styles from './action-button.module.css';
import { LoaderIcon } from '@/core/icons';
const cn = bind(styles);

interface Props {
  label: string | React.ReactNode;
  onClick?: () => void;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  disabled?: boolean;
  loading?: boolean;
}

export const ActionButton = (props: Props) => {
  const { label, onClick, startIcon, endIcon, type = 'submit', className = '', disabled, loading } = props;
  if (loading)
    return (
      <button type={type} className={cn('action-button', className)} onClick={onClick}>
        <LoaderIcon className={cn('loader')} />
      </button>
    );
  return (
    <button disabled={disabled} type={type} className={cn('action-button', className)} onClick={onClick}>
      {startIcon && startIcon}
      {label}
      {endIcon && endIcon}
    </button>
  );
};
