import { User } from '../../auth/domain/user';
export enum ONBOARDING_STEPS {
  'NAME',
  'COMPANY',
  'COMPLETED',
}

export const getOnboardingStep = (user: User): ONBOARDING_STEPS => {
  if (!user.displayName) return ONBOARDING_STEPS.NAME;
  if (!user.companyId) return ONBOARDING_STEPS.COMPANY;
  return ONBOARDING_STEPS.COMPLETED;
};
