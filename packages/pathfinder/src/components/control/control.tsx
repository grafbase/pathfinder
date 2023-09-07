import { controlClass, inputClass, labelClass } from "./control.css";
import { ControlProps } from "./control.types";
import { Input } from "./input";
import { Select } from "./select";

export const Control = ({
  alignment = "RIGHT",
  control,
  displayLabel = true,
  isDisabled = false,
  labelAddon,
  labelCopy,
}: ControlProps) => {
  return (
    <div
      className={controlClass}
      key={control.name}
      // alignment={alignment}
      //
      // isDisabled={isDisabled}
    >
      <label
        className={labelClass({
          displayLabel,
        })}
        htmlFor={control.name}
      >
        {labelCopy}
        {labelAddon && labelAddon}
      </label>

      {control.controlType === "SELECT" && (
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
      {control.controlType === "INPUT" && (
        <Input
          controlType={control.controlType}
          displayLabel={displayLabel}
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
