import { SelectInput } from '@/core/components/select-input/select-input';
import { OrderStatus } from '@/features/orders/domain/order-status';
import { useTranslate } from '@/core/i18n/hooks/use-translate.hook';
import { SingleValue } from 'react-select';

interface Props {
  defaultValue?: OrderStatus;
  onChange: (newValue: SingleValue<{ value: string; label: string }>) => void;
}

export const StatusSelector = (props: Props) => {
  const { onChange, defaultValue = OrderStatus.PENDING } = props;
  const { t } = useTranslate();
  return (
    <SelectInput
      onChange={onChange}
      options={Object.keys(OrderStatus).map((status) => ({ label: t(`order.status.${status}`), value: status }))}
      defaultValue={{ value: defaultValue, label: t(`order.status.${defaultValue}`) }}
    />
  );
};
