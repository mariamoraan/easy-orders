import { bind } from '@/core/styles/bind';
import { Form } from '@/core/components/form/form.component';
import { Input } from '@/core/components/form/input/input.component';
import { Label } from '@/core/components/form/label/label.component';
import { useTranslate } from '@/core/i18n/hooks/use-translate.hook';
import { useAuth } from '../../context/auth.context';
import { useState } from 'react';
import styles from './signup.module.css';
import { SubmitButton } from '@/core/components/form/submit-button/submit-button.component';
import { Link, Navigate } from 'react-router-dom';
import { ProtectedUrls, Urls } from '@/core/routing/urls';
import { Logo } from '@/core/components/logo/logo.component';
import { EarlyAccessLocator } from '../../di/early-access.locator';
const cn = bind(styles);

type EarlyAccessState = 'ASKING' | 'PROCESSING' | 'DONE';

export const SignupPage = () => {
  const { t } = useTranslate();
  const { isAuthenticated } = useAuth();
  const [email, setEmail] = useState('');
  const [state, setState] = useState<EarlyAccessState>('ASKING');

  const onSignUp = async () => {
    if (!email) return;
    setState('PROCESSING');
    await EarlyAccessLocator.getAskEarlyAccessCommand().handle(email);
    setState('DONE');
    setEmail('');
  };

  if (isAuthenticated) return <Navigate to={ProtectedUrls.HOME} />;

  return (
    <div className={cn('wrapper')}>
      <div className={cn('header')}>
        <Logo />
      </div>
      <h2 className={cn('title')}>{t('signup.create-account')}</h2>
      {state === 'ASKING' && <p className={cn('info')}>{t('early-access.info')}</p>}
      <Form onSubmit={onSignUp}>
        <Label label={t('signup.email')} />
        <Input
          value={email}
          placeholder={t('signup.email-placeholder')}
          onChange={(email: string) => setEmail(email)}
          spaced
        />
        {state === 'DONE' && <p className={cn('info')}>{t('early-access.thanks')}</p>}
        <SubmitButton label={t('signup.ask-for-early-access')} fullWidth center loading={state === 'PROCESSING'} />
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
