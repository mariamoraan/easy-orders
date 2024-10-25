import { bind } from '@/core/styles/bind';
import { ArrowForwardIcon } from '@/core/icons';
import React, { useState } from 'react';
import styles from './name-step.module.css';
import { AuthLocator } from '@/features/auth/delivery/di/auth.locator';
import { useAuth } from '@/features/auth/delivery/context/auth.context';
import { useOnboarding } from '../../context/onboarding.context';
import { ONBOARDING_STEPS } from '@/features/onboarding/utils/get-onboarding-step';
const cn = bind(styles);

export const NameStep = () => {
  const { user } = useAuth();
  const { currentStep, nextStep } = useOnboarding();
  const [name, setName] = useState('');
  const onSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!user?.uid) return;
    await AuthLocator.getUpdateUserCommand().handle(user?.uid, { displayName: name });
    nextStep();
  };
  if (!user || currentStep !== ONBOARDING_STEPS.NAME) return null;
  return (
    <form onSubmit={onSubmit} className={cn('form')}>
      <label className={cn('label')}>¿Cómo te llamas?</label>
      <input onChange={(e) => setName(e.target.value)} className={cn('input')} type="text" />
      <button className={cn('submit-button')} type="submit">
        Siguiente
        <ArrowForwardIcon />
      </button>
    </form>
  );
};
