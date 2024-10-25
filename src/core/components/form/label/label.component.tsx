import { bind } from '@/core/styles/bind';
import React from 'react';
import styles from './label.module.css';
const cn = bind(styles);

interface Props {
  label: string | React.ReactNode;
}

export const Label = (props: Props) => {
  const { label } = props;
  return <label className={cn('label')}>{label}</label>;
};
