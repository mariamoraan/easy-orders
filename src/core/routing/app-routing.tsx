import { createBrowserRouter } from 'react-router-dom';
import { ProtectedUrls, Urls } from './urls';
import { ProtectedRoutesWrapper } from './protected-routes-wrapper.component';
import { HomePage } from '@/features/orders/delivery/pages/home/home.page';
import { App } from '@/app';
import { OnboardingPage } from '@/features/onboarding/delivery/pages/onboarding/onboarding.page';
import { NewOrderPage } from '@/features/orders/delivery/pages/new-order/new-order.page';
import { SettingsPage } from '@/features/user/delivery/pages/settings/settings.page';
import { OrderDetailPage } from '@/features/orders/delivery/pages/order/order-detail.page';
import { LoginPage } from '@/features/auth/delivery/pages/login/login.page';
import { SignupPage } from '@/features/auth/delivery/pages/signup/signup.page';
import { FiltersPage } from '@/features/orders/delivery/pages/filters/filters.page';

export const AppRouting = createBrowserRouter([
  {
    path: '',
    element: <App />,
    children: [
      {
        path: '',
        element: <ProtectedRoutesWrapper />,
        children: [
          { path: ProtectedUrls.HOME, element: <HomePage /> },
          { path: ProtectedUrls.ORDER, element: <OrderDetailPage /> },
          {
            path: ProtectedUrls.ONBOARDING,
            element: <OnboardingPage />,
          },
          {
            path: ProtectedUrls.NEW_ORDER,
            element: <NewOrderPage />,
          },
          {
            path: ProtectedUrls.SETTINGS,
            element: <SettingsPage />,
          },
          {
            path: ProtectedUrls.FILTERS,
            element: <FiltersPage />,
          },
        ],
      },
      {
        path: Urls.LOGIN,
        element: <LoginPage />,
      },
      {
        path: Urls.SIGNUP,
        element: <SignupPage />,
      },
    ],
  },
]);
