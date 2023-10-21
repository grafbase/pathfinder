import { useState } from 'react';

import { History } from '../history';
import { HTTPHeaderControl } from '../http-header-control';
import { useResizerStore } from '../resizer';
import { Tabs } from '../tabs';
import { Variables } from '../variables';

import { scoutToolsClass } from './scout-tools.css';
import { setResizerState } from '../resizer/resizer-store';

const targetGridTemplate = `minmax(0, 0.5fr) 0px minmax(0, 0.5fr)`;
const scoutResizer = 'scout_resizer';

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
              name: 'Variables',
            },
            {
              buttonCopy: () => <span>Headers</span>,
              content: () => <HTTPHeaderControl />,
              name: 'Headers',
            },
            {
              buttonCopy: () => <span>History</span>,
              content: () => <History />,
              name: 'History',
            },
          ],
        ].map((tool) => ({
          action: () => {
            const { gridTemplate, startingGridTemplate } =
              useResizerStore.getState()[scoutResizer];

            // if these are equal it means we're in our default state
            if (startingGridTemplate === gridTemplate) {
              // so we expand our grid to a sensible default
              setResizerState({
                name: scoutResizer,
                updates: {
                  gridTemplate: targetGridTemplate,
                },
              });
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
