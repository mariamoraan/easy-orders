import { bind } from '@/core/styles/bind';
import { Form } from '@/core/components/form/form.component';
import { Input } from '@/core/components/form/input/input.component';
import { Label } from '@/core/components/form/label/label.component';
import { useTranslate } from '@/core/i18n/hooks/use-translate.hook';
import { useAuth } from '../../context/auth.context';
import { useState } from 'react';
import { Credentials } from '@/features/auth/domain/credentials';
import styles from './signup.module.css';
import { SubmitButton } from '@/core/components/form/submit-button/submit-button.component';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { ProtectedUrls, Urls } from '@/core/routing/urls';
import { Logo } from '@/core/components/logo/logo.component';
const cn = bind(styles);

export const SignupPage = () => {
  const { t } = useTranslate();
  const navigate = useNavigate();
  const { signup, errorCode, isLoading, isAuthenticated } = useAuth();
  const [credentials, setCredentials] = useState<Credentials>({ email: '', password: '' });

  const onSignUp = async () => {
    await signup(credentials);
    navigate(ProtectedUrls.HOME);
  };

  if (isAuthenticated) return <Navigate to={ProtectedUrls.HOME} />;

  return (
    <div className={cn('wrapper')}>
      <div className={cn('header')}>
        <Logo />
      </div>
      <h2 className={cn('title')}>{t('signup.create-account')}</h2>
      <Form onSubmit={onSignUp}>
        <Label label={t('signup.email')} />
        <Input
          placeholder={t('signup.email-placeholder')}
          onChange={(email: string) => setCredentials((prev) => ({ ...prev, email }))}
          spaced
        />
        <Label label={t('signup.password')} />
        <Input
          placeholder={t('signup.password-placeholder')}
          type="password"
          onChange={(password: string) => setCredentials((prev) => ({ ...prev, password }))}
          spaced
        />
        <SubmitButton label={t('signup.sign-up')} fullWidth center loading={isLoading} />
        {errorCode && <p className={cn('error')}>{t(`errors.auth.${errorCode}`)}</p>}
      </Form>
      <p className={cn('signup-text')}>
        {t('signup.already-have-account')}{' '}
        <Link className={cn('signup-link')} to={Urls.LOGIN}>
          {t('signup.log-in')}
        </Link>
      </p>
    </div>
  );
};
