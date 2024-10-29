import { bind } from '@/core/styles/bind';
import styles from './filters.module.css';
import { ActionButton } from '@/core/components/action-button/action-button.component';
import { ArrowForwardIcon, CancelIcon, DotFillIcon, DotIcon, DotsNineThinIcon, GearIcon, SaveIcon } from '@/core/icons';
import { useNavigate } from 'react-router-dom';
import { OrderStatus } from '@/features/orders/domain/order-status';
import { StatusTag } from '../../components/status-tag/status-tag.component';
import { useOrders } from '../../context/orders.provider';
import { DateTime } from '@/core/datetime/datetime';
import { useEffect, useState } from 'react';
const cn = bind(styles);

type DeliveryDateFilters = 'TODAY' | 'TOMORROW' | 'ALL' | 'CUSTOM' | 'FROM-TODAY';

export const FiltersPage = () => {
  const navigate = useNavigate();
  const { filters, setFilters } = useOrders();
  const [initialFilters] = useState(filters);
  const [selectedDeliveryDateFilters, setSelectedDeliveryDateFilters] = useState<DeliveryDateFilters[]>([]);
  const [customFromDate, setCustomFromDate] = useState<DateTime | undefined>();
  const [customToDate, setCustomToDate] = useState<DateTime | undefined>();
  const toggleStatus = (status: OrderStatus) => {
    const isInStatusFilters = filters.status.includes(status);
    if (isInStatusFilters)
      setFilters((prev) =>
        prev.status.length > 1
          ? { ...prev, status: prev.status.filter((item) => item !== status) }
          : { ...prev, status: Object.values(OrderStatus) },
      );
    else setFilters((prev) => ({ ...prev, status: [...prev.status, status] }));
  };

  useEffect(() => {
    if (!filters.deliveryDate.from && !filters.deliveryDate.to) {
      setSelectedDeliveryDateFilters(['ALL']);
      return;
    }
    // TODAY & TOMORROW
    if (
      filters.deliveryDate.from &&
      filters.deliveryDate.to &&
      filters.deliveryDate.from.toIsoDate() === DateTime.fromNow().toIsoDate() &&
      filters.deliveryDate.to.toIsoDate() === DateTime.fromNow().plus(2).toIsoDate()
    ) {
      setSelectedDeliveryDateFilters(['TODAY', 'TOMORROW']);
      return;
    }
    // TODAY
    if (
      filters.deliveryDate.from &&
      filters.deliveryDate.to &&
      filters.deliveryDate.from.toIsoDate() === DateTime.fromNow().toIsoDate() &&
      filters.deliveryDate.to.toIsoDate() === DateTime.fromNow().plus(1).toIsoDate()
    ) {
      setSelectedDeliveryDateFilters(['TODAY']);
      return;
    }
    // TOMORROW
    if (
      filters.deliveryDate.from &&
      filters.deliveryDate.to &&
      filters.deliveryDate.from.toIsoDate() === DateTime.fromNow().plus(1).toIsoDate() &&
      filters.deliveryDate.to.toIsoDate() === DateTime.fromNow().plus(2).toIsoDate()
    ) {
      setSelectedDeliveryDateFilters(['TOMORROW']);
      return;
    }
    // FROM TODAY
    if (
      filters.deliveryDate.from &&
      !filters.deliveryDate.to &&
      filters.deliveryDate.from.toIsoDate() === DateTime.fromNow().toIsoDate()
    ) {
      setSelectedDeliveryDateFilters(['FROM-TODAY']);
      return;
    }
    // CUSTOM
    setCustomFromDate(filters.deliveryDate.from);
    setCustomToDate(filters.deliveryDate.to);
    setSelectedDeliveryDateFilters(['CUSTOM']);
  }, []);

  const selectDeliveryDate = (date: DeliveryDateFilters) => {
    let currentSelectedDeliveryDateFilters = [...selectedDeliveryDateFilters];
    if (date !== 'CUSTOM') {
      setCustomFromDate(undefined);
      setCustomToDate(undefined);
    }
    if (date !== 'CUSTOM' && selectedDeliveryDateFilters.includes(date)) {
      currentSelectedDeliveryDateFilters = currentSelectedDeliveryDateFilters.filter(
        (deliveryDateFilter) => deliveryDateFilter !== date,
      );
    }
    if (!selectedDeliveryDateFilters.includes(date) && date !== 'ALL' && date !== 'CUSTOM' && date !== 'FROM-TODAY') {
      currentSelectedDeliveryDateFilters = [
        ...currentSelectedDeliveryDateFilters.filter(
          (deliveryDateFilter) =>
            deliveryDateFilter !== 'ALL' && deliveryDateFilter !== 'CUSTOM' && deliveryDateFilter !== 'FROM-TODAY',
        ),
        date,
      ];
    }
    if (!selectedDeliveryDateFilters.includes(date) && date === 'FROM-TODAY') {
      currentSelectedDeliveryDateFilters = ['FROM-TODAY'];
    }
    if (!selectedDeliveryDateFilters.includes(date) && date === 'ALL') {
      currentSelectedDeliveryDateFilters = ['ALL'];
    }
    if (!selectedDeliveryDateFilters.includes(date) && date === 'CUSTOM') {
      currentSelectedDeliveryDateFilters = ['CUSTOM'];
    }
    if (!currentSelectedDeliveryDateFilters.length) {
      currentSelectedDeliveryDateFilters = ['ALL'];
    }

    // TODAY & TOMORROW
    if (
      currentSelectedDeliveryDateFilters.includes('TODAY') &&
      currentSelectedDeliveryDateFilters.includes('TOMORROW')
    ) {
      setFilters((prev) => ({
        ...prev,
        deliveryDate: {
          from: DateTime.fromIso(DateTime.fromNow().toIsoDate() || '') ?? undefined,
          to: DateTime.fromIso(DateTime.fromNow().plus(2).toIsoDate() || '') ?? undefined,
        },
      }));
    }
    // TODAY
    else if (currentSelectedDeliveryDateFilters.includes('TODAY')) {
      setFilters((prev) => ({
        ...prev,
        deliveryDate: {
          from: DateTime.fromIso(DateTime.fromNow().toIsoDate() || '') ?? undefined,
          to: DateTime.fromIso(DateTime.fromNow().plus(1).toIsoDate() || '') ?? undefined,
        },
      }));
    }

    // TOMORROW
    else if (currentSelectedDeliveryDateFilters.includes('TOMORROW')) {
      setFilters((prev) => ({
        ...prev,
        deliveryDate: {
          from: DateTime.fromIso(DateTime.fromNow().plus(1).toIsoDate() || '') ?? undefined,
          to: DateTime.fromIso(DateTime.fromNow().plus(2).toIsoDate() || '') ?? undefined,
        },
      }));
    }

    // FROM TODAY
    if (currentSelectedDeliveryDateFilters.includes('FROM-TODAY')) {
      setFilters((prev) => ({
        ...prev,
        deliveryDate: {
          from: DateTime.fromIso(DateTime.fromNow().toIsoDate() || '') ?? undefined,
          to: undefined,
        },
      }));
    }

    // CUSTOM
    if (currentSelectedDeliveryDateFilters.includes('CUSTOM')) {
      setFilters((prev) => ({
        ...prev,
        deliveryDate: {
          from: customFromDate,
          to: customToDate,
        },
      }));
    }

    // ALL
    if (currentSelectedDeliveryDateFilters.includes('ALL')) {
      setFilters((prev) => ({ ...prev, deliveryDate: {} }));
    }
    setSelectedDeliveryDateFilters(currentSelectedDeliveryDateFilters);
  };

  useEffect(() => {
    if (!customFromDate && !customToDate) return;
    selectDeliveryDate('CUSTOM');
  }, [customFromDate, customToDate]);
  return (
    <div className={cn('wrapper')}>
      <div className={cn('header')}>
        <ActionButton
          onClick={() => {
            setFilters(initialFilters);
            navigate(-1);
          }}
          label={<CancelIcon />}
        />
        <h3 className={cn('title')}>Filtros</h3>
        <ActionButton onClick={() => navigate(-1)} label={<SaveIcon />} />
      </div>
      <div className={cn('content')}>
        <div>
          <h3 className={cn('selectable-group__title')}>Por estado</h3>
          <div className={cn('selectable-group')}>
            {Object.keys(OrderStatus).map((status) => (
              <ActionButton
                className={cn('selectable-group__item', {
                  'selectable-group__item--selected':
                    !filters.status.length || filters.status.includes(status as OrderStatus),
                })}
                key={status}
                label={<StatusTag status={status as OrderStatus} />}
                onClick={() => toggleStatus(status as OrderStatus)}
              />
            ))}
          </div>
        </div>
        <div>
          <h3 className={cn('selectable-group__title')}>Por fecha de entrega</h3>
          <div className={cn('selectable-group')}>
            <ActionButton
              className={cn('selectable-group__item', {
                'selectable-group__item--selected': selectedDeliveryDateFilters.includes('TODAY'),
              })}
              label="Hoy"
              startIcon={<DotFillIcon />}
              onClick={() => selectDeliveryDate('TODAY')}
            />
            <ActionButton
              className={cn('selectable-group__item', {
                'selectable-group__item--selected': selectedDeliveryDateFilters.includes('TOMORROW'),
              })}
              label="Mañana"
              startIcon={<ArrowForwardIcon />}
              onClick={() => selectDeliveryDate('TOMORROW')}
            />
            <ActionButton
              className={cn('selectable-group__item', {
                'selectable-group__item--selected': selectedDeliveryDateFilters.includes('FROM-TODAY'),
              })}
              label="Desde hoy"
              startIcon={<DotIcon />}
              onClick={() => selectDeliveryDate('FROM-TODAY')}
            />
            <ActionButton
              className={cn('selectable-group__item', {
                'selectable-group__item--selected': selectedDeliveryDateFilters.includes('ALL'),
              })}
              label="Todas"
              startIcon={<DotsNineThinIcon />}
              onClick={() => selectDeliveryDate('ALL')}
            />
            <ActionButton
              className={cn('selectable-group__item', {
                'selectable-group__item--selected': selectedDeliveryDateFilters.includes('CUSTOM'),
              })}
              label="Custom"
              startIcon={<GearIcon />}
              onClick={() => selectDeliveryDate('CUSTOM')}
            />
          </div>
        </div>
        {selectedDeliveryDateFilters.includes('CUSTOM') && (
          <div className={cn('custom-date-selector')}>
            <div className={cn('custom-date-selector__field')}>
              <label>From</label>
              <input
                type="date"
                value={customFromDate?.toFormat('yyyy-MM-dd') || ''}
                onChange={(e) => {
                  setCustomFromDate(DateTime.fromIso(new Date(e.target.value).toISOString()));
                }}
              />
              <ActionButton type="button" onClick={() => setCustomFromDate(undefined)} label={<CancelIcon />} />
            </div>
            <div className={cn('custom-date-selector__field')}>
              <label>To</label>
              <input
                type="date"
                value={customToDate?.toFormat('yyyy-MM-dd') || ''}
                onChange={(e) => {
                  setCustomToDate(DateTime.fromIso(new Date(e.target.value).toISOString()));
                }}
              />
              <ActionButton type="button" onClick={() => setCustomToDate(undefined)} label={<CancelIcon />} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
