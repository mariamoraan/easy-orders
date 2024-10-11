import { createBrowserRouter } from 'react-router-dom';
import { ProtectedUrls, Urls } from './urls';
import { LoginPage } from '@/features/auth/delivery/pages/login/login.page';
import { ProtectedRoutesWrapper } from './protected-routes-wrapper.component';
import { HomePage } from '@/features/orders/delivery/pages/home/home.page';
import { App } from '@/app';

export const AppRouting = createBrowserRouter([
  {
    path: '',
    element: <App />,
    children: [
      {
        path: '',
        element: <ProtectedRoutesWrapper />,
        children: [{ path: ProtectedUrls.HOME, element: <HomePage /> }],
      },
      {
        path: Urls.LOGIN,
        element: <LoginPage />,
      },
    ],
  },
]);
