import { bind } from '@/core/styles/bind';
import styles from './printable-order.module.css';
import { Order } from '@/features/orders/domain/order';
import { OrderDetail } from '../order-detail/order-detail.component';
import { useTranslate } from '@/core/i18n/hooks/use-translate.hook';
import generatePDF, { Margin, Options, Resolution } from 'react-to-pdf';
import { useRef } from 'react';
import { ActionButton } from '@/core/components/action-button/action-button.component';
import { DownloadIcon } from '@/core/icons';
const cn = bind(styles);

interface Props {
  order: Order;
  closePrintMode: () => void;
}

const options: Options = {
  // default is `save`
  // default is Resolution.MEDIUM = 3, which should be enough, higher values
  // increases the image quality but also the size of the PDF, so be careful
  // using values higher than 10 when having multiple pages generated, it
  // might cause the page to crash or hang.
  filename: 'advanced-example.pdf',
  page: {
    margin: Margin.NONE,
  },
  resolution: Resolution.HIGH,
};

export const PrintableOrder = (props: Props) => {
  const { order, closePrintMode } = props;
  const { t } = useTranslate();
  const targetRef = useRef<HTMLDivElement>(null);
  const printPdf = async () => {
    await generatePDF(targetRef, options);
    closePrintMode();
  };

  return (
    <div>
      <div className={cn('actions')}>
        <ActionButton label={<DownloadIcon />} onClick={() => printPdf()} />
      </div>
      <div ref={targetRef} className={cn('wrapper', 'print-mode')}>
        <div className={cn('header')}>
          <h2 className={cn('title')}>{t('order-detail.order')}</h2>
        </div>
        <div className={cn('content')}>
          <OrderDetail order={order} />
        </div>
      </div>
    </div>
  );
};
