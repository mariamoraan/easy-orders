import { bind } from '@/core/styles/bind';
import styles from './skeleton.module.css';
const cn = bind(styles);

interface Props {
  width?: number;
  height?: number;
  className?: string;
}

export const Skeleton = (props: Props) => {
  const { width, height, className } = props;
  return <div className={cn('skeleton', className)} style={{ width, height }}></div>;
};
