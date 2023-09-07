import { HandleChangeSignature } from "../control";
import {
  switchClass,
  switchInputClass,
  switchLabelClass,
  switchLabelSpanClass,
} from "./switch.css";

export const Switch = ({
  handleChange,
  isChecked,
  isDisabled = false,
  name,
  size = "SMALL",
}: {
  handleChange: HandleChangeSignature;
  isChecked: boolean;
  isDisabled?: boolean;
  name: string;
  size: "SMALL" | "MEDIUM" | "LARGE";
}) => {
  return (
    <div
      className={switchClass({
        isDisabled,
      })}
    >
      <input
        className={switchInputClass}
        checked={isChecked}
        disabled={isDisabled}
        id={name}
        name={name}
        onChange={() => handleChange({ name, value: !isChecked })}
        type="checkbox"
      />
      <label
        className={switchLabelClass({ isChecked, isDisabled, size })}
        htmlFor={name}
      >
        <span
          className={switchLabelSpanClass({
            isChecked,
            size,
          })}
        ></span>
      </label>
    </div>
  );
};
