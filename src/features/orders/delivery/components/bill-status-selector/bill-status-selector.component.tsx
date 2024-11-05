import { SelectInput } from '@/core/components/select-input/select-input';
import { useTranslate } from '@/core/i18n/hooks/use-translate.hook';
import { SingleValue } from 'react-select';
import { BillStatus } from '@/features/orders/domain/bill-state';

interface Props {
  defaultValue?: BillStatus;
  onChange: (newValue: SingleValue<{ value: string; label: string }>) => void;
}

export const BillStatusSelector = (props: Props) => {
  const { onChange, defaultValue = BillStatus.PENDING } = props;
  const { t } = useTranslate();
  return (
    <SelectInput
      onChange={onChange}
      options={Object.keys(BillStatus).map((status) => ({ label: t(`order.bill-status.${status}`), value: status }))}
      defaultValue={{ value: defaultValue, label: t(`order.bill-status.${defaultValue}`) }}
    />
  );
};
