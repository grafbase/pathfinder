import { Tab } from '@headlessui/react';

import {
  tabListClass,
  tabButtonClass,
  tabGroupClass,
  tabPanelClass,
  tabPanelsClass,
} from './tabs.css';

import { shared } from '@pathfinder-ide/style';

import { TabsProps } from './tabs.types';

export const Tabs = ({
  controlled,
  styles,
  tabs,
  tabListHeight = 40,
}: {
  /**
   * Optional: if passed, we control the tab state
   */
  controlled?: {
    setSelectedTabIndex: React.Dispatch<React.SetStateAction<number>>;
    selectedTabIndex: number;
  };
  styles: { buttonStyle?: string; onSurface: 1 | 2 | 3 };
  tabs: TabsProps;
  tabListHeight?: 32 | 40;
}) => {
  return (
    <Tab.Group
      onChange={controlled?.setSelectedTabIndex || undefined}
      selectedIndex={controlled?.selectedTabIndex || undefined}
    >
      <div className={tabGroupClass}>
        <Tab.List>
          <div
            className={`${tabListClass({
              tabListHeight,
            })} ${shared.hairlineBorder({
              border: 'bottom',
              onSurface: styles.onSurface,
            })}`}
          >
            {tabs.map((tab) => (
              <Tab
                className={tabButtonClass}
                key={tab.name}
                onClick={() => (tab.action ? tab.action() : undefined)}
              >
                {tab.buttonContent()}
              </Tab>
            ))}
          </div>
        </Tab.List>
        <Tab.Panels className={tabPanelsClass}>
          {tabs.map((tab) => (
            <Tab.Panel className={tabPanelClass} key={tab.name} unmount={false}>
              {tab.panelContent()}
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </div>
    </Tab.Group>
  );
};
