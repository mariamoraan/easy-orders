import { bind } from '@/core/styles/bind';
import styles from './onboarding.module.css';
import { NameStep } from '../../components/onboarding-name/name-step';
import { CompanyStep } from '../../components/company-step/company-step.component';
import { OnboardingProvider } from '../../context/onboarding.context';
const cn = bind(styles);

export const OnboardingPage = () => {
  return (
    <OnboardingProvider>
      <div className={cn('wrapper')}>
        <h1 className={cn('title')}>Onboarding</h1>
        <p className={cn('subtitle')}>Necesitamos saber algunas cosas de ti y de tu negocio para comenzar</p>
        <NameStep />
        <CompanyStep />
      </div>
    </OnboardingProvider>
  );
};
