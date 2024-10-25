import { bind } from '@/core/styles/bind';
import styles from './filters.module.css';
import { ActionButton } from '@/core/components/action-button/action-button.component';
import { ArrowBackIcon } from '@/core/icons';
import { useNavigate } from 'react-router-dom';
import { OrderStatus } from '@/features/orders/domain/order-status';
import { StatusTag } from '../../components/status-tag/status-tag.component';
import { useOrders } from '../../context/orders.provider';
import { DateTime } from '@/core/datetime/datetime';
import { useEffect, useState } from 'react';
const cn = bind(styles);

type DeliveryDateFilters = 'TODAY' | 'TOMORROW' | 'ALL';

export const FiltersPage = () => {
  const navigate = useNavigate();
  const { filters, setFilters } = useOrders();
  const [selectedDeliveryDateFilters, setSelectedDeliveryDateFilters] = useState<DeliveryDateFilters[]>([]);
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
    // TODAY
    if (
      filters.deliveryDate.from &&
      filters.deliveryDate.to &&
      filters.deliveryDate.from.toIsoDate() === DateTime.fromNow().toIsoDate() &&
      filters.deliveryDate.to.toIsoDate() === DateTime.fromNow().plus(1).toIsoDate()
    )
      setSelectedDeliveryDateFilters(['TODAY']);
    // TOMORROW
    if (
      filters.deliveryDate.from &&
      filters.deliveryDate.to &&
      filters.deliveryDate.from.toIsoDate() === DateTime.fromNow().plus(1).toIsoDate() &&
      filters.deliveryDate.to.toIsoDate() === DateTime.fromNow().plus(2).toIsoDate()
    )
      setSelectedDeliveryDateFilters(['TOMORROW']);
    // TODAY & TOMORROW
    if (
      filters.deliveryDate.from &&
      filters.deliveryDate.to &&
      filters.deliveryDate.from.toIsoDate() === DateTime.fromNow().toIsoDate() &&
      filters.deliveryDate.to.toIsoDate() === DateTime.fromNow().plus(2).toIsoDate()
    )
      setSelectedDeliveryDateFilters(['TODAY', 'TOMORROW']);
  }, []);

  const selectDeliveryDate = (date: DeliveryDateFilters) => {
    let currentSelectedDeliveryDateFilters = [...selectedDeliveryDateFilters];
    if (selectedDeliveryDateFilters.includes(date)) {
      currentSelectedDeliveryDateFilters = currentSelectedDeliveryDateFilters.filter(
        (deliveryDateFilter) => deliveryDateFilter !== date,
      );
    }
    if (!selectedDeliveryDateFilters.includes(date) && date !== 'ALL') {
      currentSelectedDeliveryDateFilters = [
        ...currentSelectedDeliveryDateFilters.filter((deliveryDateFilter) => deliveryDateFilter !== 'ALL'),
        date,
      ];
    }
    if (!selectedDeliveryDateFilters.includes(date) && date === 'ALL') {
      currentSelectedDeliveryDateFilters = ['ALL'];
    }
    if (!currentSelectedDeliveryDateFilters.length) {
      currentSelectedDeliveryDateFilters = ['ALL'];
    }

    // TODAY
    if (currentSelectedDeliveryDateFilters.includes('TODAY')) {
      setFilters((prev) => ({
        ...prev,
        deliveryDate: {
          from: DateTime.fromIso(DateTime.fromNow().toIsoDate() || '') ?? undefined,
          to: DateTime.fromIso(DateTime.fromNow().plus(1).toIsoDate() || '') ?? undefined,
        },
      }));
    }

    // TOMORROW
    if (currentSelectedDeliveryDateFilters.includes('TOMORROW')) {
      setFilters((prev) => ({
        ...prev,
        deliveryDate: {
          from: DateTime.fromIso(DateTime.fromNow().plus(1).toIsoDate() || '') ?? undefined,
          to: DateTime.fromIso(DateTime.fromNow().plus(2).toIsoDate() || '') ?? undefined,
        },
      }));
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

    // ALL
    if (currentSelectedDeliveryDateFilters.includes('ALL')) {
      setFilters((prev) => ({ ...prev, deliveryDate: {} }));
    }

    setSelectedDeliveryDateFilters(currentSelectedDeliveryDateFilters);
  };
  return (
    <div className={cn('wrapper')}>
      <div className={cn('header')}>
        <ActionButton onClick={() => navigate(-1)} label={<ArrowBackIcon />} />
        <h3 className={cn('title')}>Filtros</h3>
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
              onClick={() => selectDeliveryDate('TODAY')}
            />
            <ActionButton
              className={cn('selectable-group__item', {
                'selectable-group__item--selected': selectedDeliveryDateFilters.includes('TOMORROW'),
              })}
              label="Mañana"
              onClick={() => selectDeliveryDate('TOMORROW')}
            />
            <ActionButton
              className={cn('selectable-group__item', {
                'selectable-group__item--selected': selectedDeliveryDateFilters.includes('ALL'),
              })}
              label="Todas"
              onClick={() => selectDeliveryDate('ALL')}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
