import React, { createContext, useContext, useEffect, useState } from 'react';
import { getOnboardingStep, ONBOARDING_STEPS } from '../../utils/get-onboarding-step';
import { useAuth } from '@/features/auth/delivery/context/auth.context';
import { useNavigate } from 'react-router-dom';
import { ProtectedUrls } from '@/core/routing/urls';

interface OnboardingInterface {
  currentStep: ONBOARDING_STEPS;
  nextStep: () => void;
}

const OnboardingContext = createContext<OnboardingInterface>({
  currentStep: ONBOARDING_STEPS.NAME,
  nextStep: function (): void {
    throw new Error('Function not implemented.');
  },
});

export const OnboardingProvider = ({ children }: React.PropsWithChildren) => {
  const navigate = useNavigate();
  const { user, refetchUser } = useAuth();
  const [currentStep, setCurrentStep] = useState(ONBOARDING_STEPS.NAME);
  const nextStep = async () => {
    if (!user) return;
    await refetchUser();
    const step = getOnboardingStep(user);
    setCurrentStep(step);
  };
  useEffect(() => {
    if (!user) return;
    const next = getOnboardingStep(user);
    setCurrentStep(next);
    if (next === ONBOARDING_STEPS.COMPLETED) navigate(ProtectedUrls.HOME);
  }, [user]);
  return <OnboardingContext.Provider value={{ currentStep, nextStep }}>{children}</OnboardingContext.Provider>;
};

export const useOnboarding = () => useContext(OnboardingContext);
