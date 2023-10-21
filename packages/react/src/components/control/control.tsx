import { controlClass, labelClass } from './control.css';
import { ControlProps } from './control.types';
import { Input } from './input';
import { Select } from './select';

export const Control = ({
  control,
  displayLabel = true,
  isDisabled = false,
  labelCopy,
}: ControlProps) => {
  return (
    <div className={controlClass} key={control.name}>
      <label
        className={labelClass({
          displayLabel,
        })}
        htmlFor={control.name}
      >
        {labelCopy}
      </label>

      {control.controlType === 'SELECT' && (
        <Select
          controlType={control.controlType}
          handleChange={control.handleChange}
          isDisabled={isDisabled}
          name={control.name}
          options={control.options}
          placeholder={control.placeholder}
          value={control.value}
        />
      )}
      {control.controlType === 'INPUT' && (
        <Input
          controlType={control.controlType}
          handleChange={control.handleChange}
          isDisabled={isDisabled}
          name={control.name}
          placeholder={control.placeholder}
          value={control.value}
        />
      )}
    </div>
  );
};
