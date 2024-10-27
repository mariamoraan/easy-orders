import { bind } from '@/core/styles/bind';
import styles from './dropdown.module.css';
import { ActionButton } from '../action-button/action-button.component';
import { DotsMenuIcon } from '@/core/icons';
import { createRef, useState } from 'react';
import { useClickOutside } from '@/core/hooks/use-click-outside.hook';
const cn = bind(styles);

interface Props {
  children: (props: { setIsOpen: React.Dispatch<React.SetStateAction<boolean>> }) => React.ReactNode;
  dropdownClassName?: string;
  disabled?: boolean;
}

export const Dropdown = (props: Props) => {
  const { children, dropdownClassName = '', disabled = false } = props;
  const [isOpen, setIsOpen] = useState(false);
  const ref = createRef<HTMLDivElement>();
  const toggleIsOpen = () => setIsOpen((prev) => !prev);

  useClickOutside(ref, () => setIsOpen(false));

  return (
    <div ref={ref} className={cn('dropdown')}>
      <ActionButton
        disabled={disabled}
        onClick={toggleIsOpen}
        className={cn('dropdown__button')}
        label={<DotsMenuIcon />}
      />
      {isOpen && <div className={cn('dropdown__menu', dropdownClassName)}>{children({ setIsOpen })}</div>}
    </div>
  );
};
