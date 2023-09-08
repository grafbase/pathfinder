import { useState } from "react";

import { contract, style } from "@pathfinder/style";

import { Control } from "./control";
import type {
  ControlData,
  ControlProps,
  HandleChangeSignature,
} from "./control.types";

const col = style({
  display: `flex`,
  flexDirection: `column`,
  gap: 24,
  // backgroundColor: contract.color.neutral[1],
});

const row = style({
  display: `grid`,
  gridTemplateColumns: `160px 1fr`,
  gap: 24,
});

const info = style({
  display: `flex`,
  flexDirection: `column`,
  alignItems: `center`,
  color: contract.color.neutral[8],

  // span: {
  //   fontSize: 10,
  // },
});

const dataClass = style({
  display: `flex`,
  alignItems: `center`,
  color: contract.color.neutral[12],
});

const controls: (
  handleChange: HandleChangeSignature,
) => Array<Omit<ControlProps, "handleChange">> = (handleChange) => [
  {
    control: {
      controlType: "INPUT",
      handleChange,
      name: "INPUT",
      placeholder: `An Input`,
      value: ``,
    },
    labelCopy: "an input",
  },
  {
    alignment: "LEFT",
    control: {
      controlType: "INPUT",
      handleChange,
      name: "INPUT_NOLABEL",
      placeholder: `An Input without a label`,
      value: ``,
    },
    displayLabel: false,
    labelCopy: "an input without a label",
  },
  {
    control: {
      controlType: "SELECT",
      handleChange,
      name: "SELECT_STRING",
      options: [
        { name: "Option 1", value: "option1" },
        { name: "Option 2", value: "option2" },
      ],
      placeholder: `A string Select`,
      value: ``,
    },
    labelCopy: "a string select",
  },
  {
    alignment: "LEFT",
    control: {
      controlType: "SELECT",
      handleChange,
      name: "SELECT_STRING_NOLABEL",
      options: [
        { name: "Option 1", value: "option1" },
        { name: "Option 2", value: "option2" },
      ],
      placeholder: `A string Select without a label`,
      value: ``,
    },
    displayLabel: false,
    labelCopy: "a string select without a label",
  },
  {
    control: {
      controlType: "SELECT",
      handleChange,
      name: "SELECT_BOOLEAN",
      options: [
        { name: "True", value: "true" },
        { name: "False", value: "false" },
      ],
      placeholder: `A boolean Select`,
      value: ``,
    },
    labelCopy: "a boolean select",
  },
];

export const ControlStory = () => {
  const [values, setValues] = useState<Record<string, ControlData>>({});

  const handleChange: HandleChangeSignature = ({ name, value }) => {
    setValues((prev) => ({
      ...prev,
      [name]: { name, value },
    }));
  };

  return (
    <div className={col}>
      {controls(handleChange).map((control) => (
        <div className={row} key={control.control.name}>
          <div className={info}>
            {control.control.name}
            <span className={dataClass}>
              {values[control.control.name]
                ? values[control.control.name].value
                : ""}
            </span>
          </div>
          <Control
            alignment={control.alignment}
            control={{
              ...control.control,
              value: values[control.control.name]
                ? values[control.control.name].value
                : "",
            }}
            displayLabel={control.displayLabel}
            labelCopy={control.labelCopy}
          />
        </div>
      ))}
    </div>
  );
};
