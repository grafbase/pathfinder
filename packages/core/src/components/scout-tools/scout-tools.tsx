import { useState } from "react";

import { usePluginsStore } from "@pathfinder/stores";

import { useResizer } from "../resizer";
import { HTTPHeaderControl } from "../http-header-control";
import { Tabs } from "../tabs";
import { Variables } from "../variables";

import { scoutToolsClass } from "./scout-tools.css";

export const ScoutTools = () => {
  const [selectedTabIndex, setSelectedTabIndex] = useState<number>(0);

  const { initialSize, pane1Size, resetPane } = useResizer();

  const scoutToolsPlugins = usePluginsStore
    .getState()
    .scoutTools.map((tool) => ({
      buttonCopy: tool.buttonCopy,
      content: tool.content,
      name: tool.name,
    }));

  return (
    <div className={scoutToolsClass}>
      <Tabs
        controlled={{
          selectedTabIndex,
          setSelectedTabIndex,
        }}
        styles={{ onSurface: 1 }}
        tabs={[
          ...[
            {
              buttonCopy: () => <span>Variables</span>,
              content: () => <Variables />,
              name: "Variables",
            },
            {
              buttonCopy: () => <span>Headers</span>,
              content: () => <HTTPHeaderControl placement="IN_APP" />,
              name: "Headers",
            },
          ],
          ...scoutToolsPlugins,
        ].map((tool) => ({
          action: initialSize === pane1Size ? resetPane : undefined,
          buttonContent: tool.buttonCopy,
          name: tool.name,
          panelContent: tool.content,
        }))}
      />
    </div>
  );
};
