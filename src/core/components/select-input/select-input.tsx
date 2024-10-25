import Select, { SingleValue } from 'react-select';

interface Props {
  options: { value: string; label: string }[];
  defaultValue?: { value: string; label: string };
  placeholder?: string;
  onChange: (newValue: SingleValue<{ value: string; label: string }>) => void;
}

export const SelectInput = (props: Props) => {
  const { options, defaultValue, placeholder, onChange } = props;
  return <Select onChange={onChange} placeholder={placeholder} options={options} defaultValue={defaultValue} />;
};
