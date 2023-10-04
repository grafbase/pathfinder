import { useState } from "react";

import { Switch } from "./switch";

export const Switches = () => {
  const [value, setValue] = useState<boolean>(false);

  const handleChange = ({ value }: { value: string | string[] | boolean }) => {
    setValue(!!value);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex" }}>
        <span>small</span>
        <Switch
          handleChange={handleChange}
          isChecked={value}
          name={`some-name1`}
          size="SMALL"
        />
      </div>
      <div style={{ display: "flex" }}>
        <span>medium</span>
        <Switch
          handleChange={handleChange}
          isChecked={value}
          name={`some-name2`}
          size="MEDIUM"
        />
      </div>
      <div style={{ display: "flex" }}>
        <span>large</span>
        <Switch
          handleChange={handleChange}
          isChecked={value}
          name={`some-name3`}
          size="LARGE"
        />
      </div>
    </div>
  );
};
