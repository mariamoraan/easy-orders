import { bind } from '@/core/styles/bind';
import { Form } from '@/core/components/form/form.component';
import { Input } from '@/core/components/form/input/input.component';
import { Label } from '@/core/components/form/label/label.component';
import { useTranslate } from '@/core/i18n/hooks/use-translate.hook';
import { useAuth } from '../../context/auth.context';
import { useState } from 'react';
import { Credentials } from '@/features/auth/domain/credentials';
import styles from './login.module.css';
import { SubmitButton } from '@/core/components/form/submit-button/submit-button.component';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { ProtectedUrls, Urls } from '@/core/routing/urls';
import { Logo } from '@/core/components/logo/logo.component';
const cn = bind(styles);

export const LoginPage = () => {
  const { t } = useTranslate();
  const navigate = useNavigate();
  const { login, errorCode, isLoading, isAuthenticated } = useAuth();
  const [credentials, setCredentials] = useState<Credentials>({ email: '', password: '' });

  const onLogin = async () => {
    await login(credentials);
    navigate(ProtectedUrls.HOME);
  };

  if (isAuthenticated) return <Navigate to={ProtectedUrls.HOME} />;

  return (
    <div className={cn('wrapper')}>
      <div className={cn('header')}>
        <Logo />
      </div>
      <h2 className={cn('title')}>{t('login.log-in-with-credentials')}</h2>
      <Form onSubmit={onLogin}>
        <Label label={t('login.email')} />
        <Input
          placeholder={t('login.email-placeholder')}
          onChange={(email: string) => setCredentials((prev) => ({ ...prev, email }))}
          spaced
        />
        <Label label={t('login.password')} />
        <Input
          placeholder={t('login.password-placeholder')}
          type="password"
          onChange={(password: string) => setCredentials((prev) => ({ ...prev, password }))}
          spaced
        />
        <SubmitButton label={t('login.log-in')} fullWidth center loading={isLoading} />
        {errorCode && <p className={cn('error')}>{t(`errors.auth.${errorCode}`)}</p>}
      </Form>
      <p className={cn('signup-text')}>
        {t('login.do-not-have-account')}{' '}
        <Link className={cn('signup-link')} to={Urls.SIGNUP}>
          {t('login.sign-up')}
        </Link>
      </p>
    </div>
  );
};
