import { useState } from 'react';

import { Control } from './control';

import type { ControlData, ControlProps, HandleChangeSignature } from './control.types';

import { col, row, info, dataClass } from './control.css';

const controls: (
  handleChange: HandleChangeSignature,
) => Array<Omit<ControlProps, 'handleChange'>> = (handleChange) => [
  {
    control: {
      controlType: 'INPUT',
      handleChange,
      name: 'INPUT',
      placeholder: `An Input`,
      value: ``,
    },
    labelCopy: 'an input',
  },
  {
    alignment: 'LEFT',
    control: {
      controlType: 'INPUT',
      handleChange,
      name: 'INPUT_NOLABEL',
      placeholder: `An Input without a label`,
      value: ``,
    },
    displayLabel: false,
    labelCopy: 'an input without a label',
  },
  {
    control: {
      controlType: 'SELECT',
      handleChange,
      name: 'SELECT_STRING',
      options: [
        { name: 'Option 1', value: 'option1' },
        { name: 'Option 2', value: 'option2' },
      ],
      placeholder: `A string Select`,
      value: ``,
    },
    labelCopy: 'a string select',
  },
  {
    alignment: 'LEFT',
    control: {
      controlType: 'SELECT',
      handleChange,
      name: 'SELECT_STRING_NOLABEL',
      options: [
        { name: 'Option 1', value: 'option1' },
        { name: 'Option 2', value: 'option2' },
      ],
      placeholder: `A string Select without a label`,
      value: ``,
    },
    displayLabel: false,
    labelCopy: 'a string select without a label',
  },
  {
    control: {
      controlType: 'SELECT',
      handleChange,
      name: 'SELECT_BOOLEAN',
      options: [
        { name: 'True', value: 'true' },
        { name: 'False', value: 'false' },
      ],
      placeholder: `A boolean Select`,
      value: ``,
    },
    labelCopy: 'a boolean select',
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
              {values[control.control.name] ? values[control.control.name].value : ''}
            </span>
          </div>
          <Control
            control={{
              ...control.control,
              value: values[control.control.name]
                ? values[control.control.name].value
                : '',
            }}
            labelCopy={control.labelCopy}
          />
        </div>
      ))}
    </div>
  );
};
