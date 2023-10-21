import { selectClass, selectDecorationClass, selectWrapClass } from './control.css';
import { SelectProps } from './control.types';

export const Select = ({
  handleChange,
  isDisabled,
  name,
  options,
  placeholder,
  value,
}: SelectProps) => {
  return (
    <div
      className={selectWrapClass}
      // isSelected={options.some((option) => option.value === value)}
    >
      <select
        className={selectClass}
        disabled={isDisabled}
        name={name}
        onChange={(e) => {
          handleChange({
            name,
            value: e.target.value,
          });
        }}
        value={value as string}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option value={option.value} key={option.value}>
            {option.name}
          </option>
        ))}
      </select>
      <div className={selectDecorationClass}>%</div>
    </div>
  );
};
