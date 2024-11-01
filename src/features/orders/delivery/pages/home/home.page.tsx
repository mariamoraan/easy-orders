import { bind } from '@/core/styles/bind';
import styles from './home.module.css';
import { useAuth } from '@/features/auth/delivery/context/auth.context';
import { getOnboardingStep, ONBOARDING_STEPS } from '@/features/onboarding/utils/get-onboarding-step';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { ProtectedUrls } from '@/core/routing/urls';
import { useTranslate } from '@/core/i18n/hooks/use-translate.hook';
import { AddCircleIcon, ArrowForwardIcon, FilterIcon, LongArrowRightIcon } from '@/core/icons';
import { Suspense, useState } from 'react';
import { useCompany } from '@/features/company/delivery/context/company.provider';
import { useOrders } from '../../context/orders.provider';
import { DateTime } from '@/core/datetime/datetime';
import { StatusTag } from '../../components/status-tag/status-tag.component';
import { Button } from '@/core/components/button/button.component';
const cn = bind(styles);

export const HomePage = () => {
  const { t } = useTranslate();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { company } = useCompany();
  const { orders, count, filters } = useOrders();
  const [isFetching, setIsFetching] = useState(false);
  if (!user) return null;
  if (getOnboardingStep(user) !== ONBOARDING_STEPS.COMPLETED) return <Navigate to={ProtectedUrls.ONBOARDING} />;

  const calcFiltersNumber = () => {
    const hasDeliveryDateFilter = filters.deliveryDate.from || filters.deliveryDate.to;
    const hasStatusFilter = filters.status.length < 4;
    let counter = 0;
    counter = counter + (hasDeliveryDateFilter ? 1 : 0);
    counter = counter + (hasStatusFilter ? 1 : 0);
    return counter;
  };

  const handleScroll = () => {
    if (
      Math.ceil(window.innerHeight + document.documentElement.scrollTop) !== document.documentElement.offsetHeight ||
      isFetching
    )
      return;
    setIsFetching(true);
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((word) => word[0])
      .join('')
      .slice(0, 2);
  };

  const getRelativeDate = (date: DateTime): string => {
    const today = DateTime.fromNow();
    if (today.toFormat() === date.toFormat()) return t('dates.today');
    if (today.plus(1).toFormat() === date.toFormat()) return t('dates.tomorrow');
    return date.toFormat();
  };

  return (
    <div className={cn('page')}>
      <div className={cn('top-bar')}>
        <h3 className={cn('subtitle')}>{t('home.greeting', { name: user.displayName })}</h3>
        <Link
          to={ProtectedUrls.SETTINGS}
          className={cn('avatar')}
          style={{ backgroundImage: `url('${user.photoUrl}')` }}
        >
          {!user.photoUrl && getInitials(user.displayName || '')}
        </Link>
      </div>
      <h2 className={cn('title')}>{company.name}</h2>
      <div className={cn('action-bar')}>
        <span className={cn('orders-count')}>
          {orders.length} de {count}
        </span>
        <Button
          onClick={() => navigate(ProtectedUrls.FILTERS)}
          label={'Filtrar'}
          startIcon={<FilterIcon />}
          small
          mark={calcFiltersNumber() > 0 && <span className={cn('filters-mark')}>{calcFiltersNumber()}</span>}
        />
        <Button onClick={() => navigate(ProtectedUrls.NEW_ORDER)} label={'Nuevo'} startIcon={<AddCircleIcon />} small />
      </div>
      {!orders.length && <p className={cn('no-orders')}>No hay pedidos</p>}
      <ul onScroll={handleScroll} className={cn('orders')}>
        {orders.length > 0 &&
          orders.map((order, index) => (
            <li
              key={index}
              className={cn('orders-li')}
              onClick={() =>
                navigate(ProtectedUrls.ORDER.replace(':orderId', order.id), { state: { orderId: order.id } })
              }
            >
              <Suspense fallback={<div className={cn('order-li__skeleton')}></div>}>
                <div className={cn('order__top-bar')}>
                  <StatusTag status={order.status} />
                  <ArrowForwardIcon className={cn('order-detail__link')} />
                </div>
                <div>
                  <div className={cn('order-title')}>
                    <p className={cn('order-title__name')}>
                      {t('home.order')} {order.orderNum}
                    </p>
                    {order.clientName && <p className={cn('order-title__client')}>{order.clientName}</p>}
                  </div>
                </div>
                <div className={cn('order-dates')}>
                  <p className={cn('order-date')}>{getRelativeDate(order.creationDate)}</p>
                  <LongArrowRightIcon />
                  <p
                    className={cn('order-date', {
                      'order-date--important':
                        getRelativeDate(order.deliverDate) === t('dates.today') ||
                        getRelativeDate(order.deliverDate) === t('dates.tomorrow'),
                    })}
                  >
                    {getRelativeDate(order.deliverDate)}
                  </p>
                </div>
              </Suspense>
            </li>
          ))}
      </ul>
    </div>
  );
};
