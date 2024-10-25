import { bind } from '@/core/styles/bind';
import styles from './date-input.module.css';
import { useEffect, useState } from 'react';
import { Input } from '../input/input.component';
import { DateTime } from '@/core/datetime/datetime';
const cn = bind(styles);

interface Props {
  value?: DateTime;
  onChange?: (value: DateTime) => void;
  disabled?: boolean;
}

export const DateInput = (props: Props) => {
  const { onChange, value, disabled = false } = props;
  const [date, setDate] = useState<{ year: number; month: number; day: number }>({
    year: value?.year() ?? DateTime.fromNow().year(),
    month: value?.month() ?? DateTime.fromNow().month(),
    day: value?.day() ?? DateTime.fromNow().day(),
  });

  useEffect(() => {
    const datetime = DateTime.fromIso(`${date.year}-${date.month}-${date.day}`);
    if (datetime) onChange && onChange(datetime);
  }, [date, onChange]);

  return (
    <div className={cn('date-input')}>
      <Input
        type="number"
        value={date.year}
        onChange={(year) => setDate((prev) => ({ ...prev, year: Number(year) }))}
        placeholder="yyyy"
        disabled={disabled}
        className={cn('date-input__input')}
      />
      <Input
        type="number"
        value={date.month}
        onChange={(month) => setDate((prev) => ({ ...prev, month: Number(month) }))}
        placeholder="mm"
        disabled={disabled}
        className={cn('date-input__input')}
      />
      <Input
        type="number"
        value={date.day}
        onChange={(day) => setDate((prev) => ({ ...prev, day: Number(day) }))}
        placeholder="dd"
        disabled={disabled}
        className={cn('date-input__input')}
      />
    </div>
  );
};
