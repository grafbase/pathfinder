import { ElementType } from "react";

export type ScoutToolPlugin = {
  buttonCopy: ElementType;
  content: ElementType;
  name: string;
};

export type PluginsStoreState = {
  scoutTools: ScoutToolPlugin[];
};

export type PluginsStore = PluginsStoreState;
