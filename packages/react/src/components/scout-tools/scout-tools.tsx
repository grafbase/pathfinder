import { useState } from "react";

import { History } from "../history";
import { HTTPHeaderControl } from "../http-header-control";
import { resetPane, useResizerStore } from "../resizer";
import { Tabs } from "../tabs";
import { Variables } from "../variables";

import { scoutToolsClass } from "./scout-tools.css";

export const ScoutTools = () => {
  const [selectedTabIndex, setSelectedTabIndex] = useState<number>(0);

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
              content: () => <HTTPHeaderControl />,
              name: "Headers",
            },
            {
              buttonCopy: () => <span>History</span>,
              content: () => <History />,
              name: "History",
            },
          ],
        ].map((tool) => ({
          action: () => {
            const { initialSize, pane1Size } =
              useResizerStore.getState()["scout_resizer"];
            if (initialSize === pane1Size) {
              return resetPane({ resizerName: "scout_resizer" });
            }
          },
          buttonContent: tool.buttonCopy,
          name: tool.name,
          panelContent: tool.content,
        }))}
      />
    </div>
  );
};
