import { bind } from '@/core/styles/bind';
import { useTranslate } from '@/core/i18n/hooks/use-translate.hook';
import { BillStatus } from '@/features/orders/domain/bill-state';
import styles from './bill-status-tag.module.css';
import { DeliveredIcon, PendantIcon } from '@/core/icons';
const cn = bind(styles);

interface Props {
  billStatus?: BillStatus;
}

export const BillStatusColor: { [key in BillStatus]: string } = {
  [BillStatus.PENDING]: 'red',
  [BillStatus.DONE]: 'green',
};

export const BillStatusIcon: { [key in BillStatus]: React.ReactNode } = {
  [BillStatus.PENDING]: <PendantIcon />,
  [BillStatus.DONE]: <DeliveredIcon />,
};

export const BillStatusTag = (props: Props) => {
  const { billStatus = BillStatus.PENDING } = props;
  const { t } = useTranslate();
  return (
    <p className={cn('bill-status-tag', `bill-status-tag--${billStatus}`)}>
      {BillStatusIcon[billStatus]} {t(`order.bill-status.${billStatus}`)}
    </p>
  );
};
