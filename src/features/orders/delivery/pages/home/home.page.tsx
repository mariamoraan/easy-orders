import { bind } from '@/core/styles/bind';
import styles from './home.module.css';
import { useAuth } from '@/features/auth/delivery/context/auth.context';
import { getOnboardingStep, ONBOARDING_STEPS } from '@/features/onboarding/utils/get-onboarding-step';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { ProtectedUrls } from '@/core/routing/urls';
import { useTranslate } from '@/core/i18n/hooks/use-translate.hook';
import { ArrowForwardIcon, FilterIcon, LongArrowRightIcon, SearchIcon } from '@/core/icons';
import { Suspense, useState } from 'react';
import { ActionButton } from '@/core/components/action-button/action-button.component';
import { Button } from '@/core/components/button/button.component';
import { useCompany } from '@/features/company/delivery/context/company.provider';
import { useOrders } from '../../context/orders.provider';
import { DateTime } from '@/core/datetime/datetime';
import { StatusTag } from '../../components/status-tag/status-tag.component';
const cn = bind(styles);

export const HomePage = () => {
  const { t } = useTranslate();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { company } = useCompany();
  const { orders, count } = useOrders();
  const [isFetching, setIsFetching] = useState(false);
  if (!user) return null;
  if (getOnboardingStep(user) !== ONBOARDING_STEPS.COMPLETED) return <Navigate to={ProtectedUrls.ONBOARDING} />;

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

  const onSearch = (e: React.SyntheticEvent) => {
    e.preventDefault();
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
      <div className={cn('orders-header')}>
        <h2 className={cn('orders-title')}>{t('home.orders')}</h2>
        <Link className={cn('new-order-link')} to={ProtectedUrls.NEW_ORDER}>
          Nuevo pedido
        </Link>
      </div>
      <div className={cn('action-bar')}>
        <form onSubmit={onSearch} className={cn('searcher')}>
          <SearchIcon />
          <input className={cn('searcher-input')} placeholder="Search..." />
          <ActionButton type="submit" label={<ArrowForwardIcon />} />
        </form>
        <Button
          onClick={() => navigate(ProtectedUrls.FILTERS)}
          center
          fullWidth
          label="Filtrar"
          startIcon={<FilterIcon />}
        />
      </div>
      <div className={cn('selector')}>
        <p className={cn('selector-p')}>
          ALL <span className={cn('selector-p__tag')}>{count}</span>
        </p>
      </div>
      <ul onScroll={handleScroll} className={cn('orders')}>
        {orders.length > 0 &&
          orders.map((order, index) => (
            <li key={index} className={cn('orders-li')}>
              <Suspense fallback={<div className={cn('order-li__skeleton')}></div>}>
                <div className={cn('order__top-bar')}>
                  <StatusTag status={order.status} />
                  <Link className={cn('order-detail__link')} to={ProtectedUrls.ORDER.replace(':orderId', order.id)}>
                    <ArrowForwardIcon />
                  </Link>
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
