import { bind } from '@/core/styles/bind';
import styles from './input.module.css';
const cn = bind(styles);

interface Props {
  value?: string | number;
  onChange?: <T>(value: T) => void;
  type?: 'text' | 'email' | 'password' | 'number';
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  style?: 'default' | 'outlined';
  spaced?: boolean;
}

export const Input = (props: Props) => {
  const { onChange, type = 'text', placeholder, disabled, value, className = '', style = 'default', spaced } = props;
  return (
    <input
      value={value}
      onChange={(e) => onChange && onChange(e.target.value)}
      className={cn(
        'input',
        {
          'input--outlined': style === 'outlined',
          'input--spaced': spaced,
        },
        className,
      )}
      type={type}
      placeholder={placeholder}
      disabled={disabled}
    />
  );
};
