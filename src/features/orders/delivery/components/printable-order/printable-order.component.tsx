import { useTranslate } from '@/core/i18n/hooks/use-translate.hook';
import { User } from '@/features/auth/domain/user';
import { Company } from '@/features/company/domain/company';
import { Order } from '@/features/orders/domain/order';
import { getTotalPrice } from '@/features/orders/domain/utils';
import { Page, Text, View, Document, StyleSheet, Image, Font } from '@react-pdf/renderer';
import { OrderStatusIcon, StatusColors } from '../status-tag/status-tag.component';
import MontserratFont from './Montserrat-Medium.ttf';
import MontserratRegularFont from './Montserrat-Regular.ttf';

Font.register({
  family: 'Montserrat',
  fonts: [{ src: MontserratRegularFont }, { src: MontserratFont, fontWeight: 'bold' }],
});

const styles = StyleSheet.create({
  page: {
    padding: '32pt 0',
    fontFamily: 'Montserrat',
  },
  header: {
    marginBottom: '32pt',
    padding: '0 16pt',
    paddingBottom: '32pt',
    minHeight: '100pt',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    gap: '24pt',
    fontSize: '24pt',
    borderBottom: '1px solid #e0e0e0',
    fontWeight: 'bold',
  },
  logo: {
    height: '42pt',
    width: '42pt',
    objectFit: 'contain',
  },
  content: {
    padding: '0 16pt',
    fontSize: '12pt',
    display: 'flex',
    flexDirection: 'column',
    gap: '32pt',
  },
  title: {
    fontWeight: 600,
    fontSize: '16pt',
    textAlign: 'center',
  },
  info: {},
  sectionTitle: {
    marginBottom: '14pt',
    fontWeight: 'bold',
  },
  infoRow: {
    padding: '12pt 24pt',
    display: 'flex',
    flexDirection: 'row',
    borderRadius: '4pt',
  },
  infoRowEven: {
    padding: '12pt 24pt',
    display: 'flex',
    flexDirection: 'row',
    borderRadius: '4pt',
    backgroundColor: 'rgb(249, 249, 249)',
  },
  infoRowTitle: {
    flex: 1,
  },
  infoRowContent: {
    flex: 1,
    display: 'flex',
    textAlign: 'right',
    justifyContent: 'flex-end',
    fontWeight: 'bold',
  },
  description: {
    padding: '24pt 12pt',
    whiteSpace: 'pre-wrap',
    backgroundColor: 'rgb(249, 249, 249)',
    borderRadius: '4pt',
    lineHeight: '1.5',
  },
  statusTagWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '4pt',
  },
  statusTag: {
    display: 'flex',
    alignItems: 'center',
    gap: '4pt',
    fontSize: '10pt',
    textTransform: 'uppercase',
    borderRadius: '24pt',
    flex: 1,
    textAlign: 'right',
    justifyContent: 'flex-end',
    fontWeight: 'bold',
  },
  bold: {
    fontWeight: 'bold',
  },
});

interface Props {
  order: Order;
  company: Company;
  user: User;
}

export const PrintableOrder = (props: Props) => {
  const { order, company, user } = props;
  const { t } = useTranslate();
  return (
    <Document>
      <Page style={styles.page} size="A4">
        <View style={styles.header}>
          {company.logoUrl && <Image style={styles.logo} src={company.logoUrl} />}
          <Text>{company.name}</Text>
        </View>
        <View style={styles.content}>
          <View style={styles.info}>
            <Text style={styles.sectionTitle}>Cliente</Text>
            <View style={styles.infoRowEven}>
              <Text style={styles.infoRowTitle}>{t('order-detail.client-name')}</Text>
              <Text style={styles.infoRowContent}>{order.clientName || '-'}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoRowTitle}>{t('order-detail.client-phone')}</Text>
              <Text style={styles.infoRowContent}>{order.clientPhone || '-'}</Text>
            </View>
          </View>
          <View style={styles.info}>
            <Text style={styles.sectionTitle}>Pedido</Text>
            <View style={styles.infoRowEven}>
              <Text style={styles.infoRowTitle}>{t('order-detail.creation-date')}</Text>
              <Text style={styles.infoRowContent}>{order.creationDate.toFormat() || '-'}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoRowTitle}>{t('order-detail.daliver-date')}</Text>
              <Text style={styles.infoRowContent}>{order.deliverDate.toFormat() || '-'}</Text>
            </View>
            <View style={styles.infoRowEven}>
              <Text style={styles.infoRowTitle}>{t('order-detail.state')}</Text>
              <Text style={{ ...styles.statusTag, color: StatusColors[order.status] }}>
                {t(`order.status.${order.status}`)}
              </Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoRowTitle}>{t('order-detail.delivery-address')}</Text>
              <Text style={styles.infoRowContent}>{order.deliveryAddress || '-'}</Text>
            </View>
            <View style={styles.infoRowEven}>
              <Text style={styles.infoRowTitle}>{t('order-detail.sign')}</Text>
              <Text style={styles.infoRowContent}>
                {order.signal || '-'} {user?.currency || '€'}
              </Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoRowTitle}>{t('order-detail.price')}</Text>
              <Text style={styles.infoRowContent}>
                {order.price || '-'} {user?.currency || '€'}
              </Text>
            </View>
            <View style={styles.infoRowEven}>
              <Text style={[styles.infoRowTitle, styles.bold]}>{t('order-detail.total')}</Text>
              <View style={styles.statusTagWrapper}>
                {OrderStatusIcon[order.status]}
                <Text style={styles.infoRowContent}>
                  {getTotalPrice({ price: order.price, signal: order.signal })} {user?.currency || '€'}
                </Text>
              </View>
            </View>
          </View>
          {order.description && (
            <View style={styles.info}>
              <Text style={styles.sectionTitle}>Detalle</Text>
              <Text style={styles.description}>{order.description}</Text>
            </View>
          )}
        </View>
      </Page>
    </Document>
  );
};
