import { Button } from '../../button/button.component';

interface Props {
  label: string | React.ReactNode;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  className?: string;
  fullWidth?: boolean;
  center?: boolean;
  loading?: boolean;
}

export const SubmitButton = (props: Props) => {
  return <Button type="submit" {...props} />;
};
