import { bind } from '@/core/styles/bind';
import styles from './input-number.module.css';
const cn = bind(styles);

interface Props {
  value?: string | number;
  onChange?: (value: number) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  style?: 'default' | 'outlined';
  spaced?: boolean;
}

export const InputNumber = (props: Props) => {
  const { onChange, placeholder, disabled, value, className = '', style = 'default', spaced } = props;
  return (
    <input
      value={value}
      onChange={(e) => onChange && onChange(Number(e.target.value))}
      className={cn(
        'input',
        {
          'input--outlined': style === 'outlined',
          'input--spaced': spaced,
        },
        className,
      )}
      type="number"
      placeholder={placeholder}
      disabled={disabled}
    />
  );
};
