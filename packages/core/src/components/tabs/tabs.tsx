import { Tab } from "@headlessui/react";

import {
  tabListClass,
  tabButtonClass,
  tabGroupClass,
  tabPanelClass,
  tabPanelsClass,
} from "./tabs.css";

import { TabsProps } from "./tabs.types";

export const Tabs = ({
  controlled,
  tabs,
  tabListHeight = 40,
  variant,
}: {
  /**
   * Optional: if passed, we control the tab state
   */
  controlled?: {
    setSelectedTabIndex: React.Dispatch<React.SetStateAction<number>>;
    selectedTabIndex: number;
  };
  tabs: TabsProps;
  tabListHeight?: 32 | 40;
  variant: "BUTTON_LIKE" | "INLINE";
}) => {
  return (
    <Tab.Group
      onChange={controlled?.setSelectedTabIndex || undefined}
      selectedIndex={controlled?.selectedTabIndex || undefined}
    >
      <div className={tabGroupClass}>
        <Tab.List>
          <div
            className={tabListClass({
              tabListHeight,
            })}
          >
            {tabs.map((tab) => {
              const ButtonContent = tab.buttonContent;
              return (
                <Tab
                  className={tabButtonClass({
                    variant,
                  })}
                  key={tab.name}
                  onClick={() => (tab.action ? tab.action() : undefined)}
                >
                  <ButtonContent />
                </Tab>
              );
            })}
          </div>
        </Tab.List>
        <Tab.Panels className={tabPanelsClass}>
          {tabs.map((tab) => {
            const PanelContent = tab.panelContent;
            return (
              <Tab.Panel
                className={tabPanelClass}
                key={tab.name}
                unmount={false}
              >
                <PanelContent />
              </Tab.Panel>
            );
          })}
        </Tab.Panels>
      </div>
    </Tab.Group>
  );
};
