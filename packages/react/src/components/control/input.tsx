import { inputClass } from './control.css';
import type { InputProps } from './control.types';

export const Input = ({
  handleChange,
  isDisabled,
  name,
  placeholder,
  value,
}: InputProps) => {
  return (
    <input
      className={inputClass}
      autoComplete="off"
      disabled={isDisabled}
      id={name}
      name={name}
      onChange={(e) => {
        handleChange({
          name,
          value: e.target.value,
        });
      }}
      placeholder={placeholder}
      type="text"
      value={value as string}
    />
  );
};
