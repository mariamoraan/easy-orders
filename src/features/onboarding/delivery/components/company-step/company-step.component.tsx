import { bind } from '@/core/styles/bind';
import styles from './company-step.module.css';
import { ArrowForwardIcon } from '@/core/icons';
import { useState } from 'react';
import { useAuth } from '@/features/auth/delivery/context/auth.context';
import { AuthLocator } from '@/features/auth/delivery/di/auth.locator';
import { Company } from '@/features/company/domain/company';
import { CompanyLocator } from '@/features/company/delivery/locator';
import { useOnboarding } from '../../context/onboarding.context';
import { ONBOARDING_STEPS } from '@/features/onboarding/utils/get-onboarding-step';
const cn = bind(styles);

export const CompanyStep = () => {
  const { user } = useAuth();
  const { currentStep, nextStep } = useOnboarding();

  const [company, setCompany] = useState<Company>({
    id: '',
    name: '',
    ownerId: '',
  });
  if (!user || currentStep !== ONBOARDING_STEPS.COMPANY) return null;
  const onSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const companyId = user.uid + window.crypto.randomUUID();
    await CompanyLocator.getCreateCompanyCommand().handle({ ...company, id: companyId, ownerId: user.uid });
    await AuthLocator.getUpdateUserCommand().handle(user?.uid, { companyId: companyId });
    nextStep();
  };

  return (
    <form onSubmit={onSubmit} className={cn('form')}>
      <label className={cn('label')}>¿Cómo se llama tu empresa?</label>
      <input
        onChange={(e) => setCompany((prev) => ({ ...prev, name: e.target.value }))}
        className={cn('input')}
        type="text"
      />
      <button className={cn('submit-button')} type="submit">
        Siguiente
        <ArrowForwardIcon />
      </button>
    </form>
  );
};
