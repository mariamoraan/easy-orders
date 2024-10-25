import { bind } from '@/core/styles/bind';
import styles from './form.module.css';
import React from 'react';
import { Input } from './input/input.component';
import { Label } from './label/label.component';
import { SubmitButton } from './submit-button/submit-button.component';
const cn = bind(styles);

interface Props {
  children: React.ReactNode;
  onSubmit: () => void;
  className?: string;
}

export const Form = (props: Props) => {
  const { children, onSubmit, className = '' } = props;
  const submit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    onSubmit();
  };
  return (
    <form className={cn('form', className)} onSubmit={submit}>
      {children}
    </form>
  );
};

Form.Input = Input;
Form.Label = Label;
Form.SubmitButton = SubmitButton;
