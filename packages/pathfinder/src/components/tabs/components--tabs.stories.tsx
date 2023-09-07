import { useState } from "react";

import { Tabs } from "./tabs";

const tabs = [
  {
    buttonContent: () => "Tab 1",
    name: "Tab 1",
    panelContent: () => <p>Tab 1</p>,
  },
  {
    action: () => alert("click tab 2"),
    buttonContent: () => "Tab 2",
    name: "Tab 2",
    panelContent: () => <p>Tab 2</p>,
  },
  {
    buttonContent: () => "Tab 3",
    name: "Tab 3",
    panelContent: () => <p>Tab 3</p>,
  },
];

export const SideBySide = () => {
  const [selectedTabIndex, setSelectedTabIndex] = useState<number>(0);
  return (
    <div style={{ display: "flex", gap: 24 }}>
      <Tabs
        controlled={{
          selectedTabIndex,
          setSelectedTabIndex,
        }}
        tabs={tabs}
        variant={"INLINE"}
      />
      <Tabs
        controlled={{
          selectedTabIndex,
          setSelectedTabIndex,
        }}
        tabs={tabs}
        variant={"BUTTON_LIKE"}
      />
    </div>
  );
};

export const Inline = () => {
  const [selectedTabIndex, setSelectedTabIndex] = useState<number>(0);
  return (
    <Tabs
      controlled={{
        selectedTabIndex,
        setSelectedTabIndex,
      }}
      tabs={tabs}
      variant={"INLINE"}
    />
  );
};

export const Buttons = () => {
  const [selectedTabIndex, setSelectedTabIndex] = useState<number>(0);
  return (
    <Tabs
      controlled={{
        selectedTabIndex,
        setSelectedTabIndex,
      }}
      tabs={tabs}
      variant={"BUTTON_LIKE"}
    />
  );
};
