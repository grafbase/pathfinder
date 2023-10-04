import { useState } from "react";

import { History } from "../history";
import { HTTPHeaderControl } from "../http-header-control";
import { useResizer } from "../resizer";
import { Tabs } from "../tabs";
import { Variables } from "../variables";

import { scoutToolsClass } from "./scout-tools.css";

export const ScoutTools = () => {
  const [selectedTabIndex, setSelectedTabIndex] = useState<number>(0);

  const { initialSize, pane1Size, resetPane } = useResizer();

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
          action: initialSize === pane1Size ? resetPane : undefined,
          buttonContent: tool.buttonCopy,
          name: tool.name,
          panelContent: tool.content,
        }))}
      />
    </div>
  );
};