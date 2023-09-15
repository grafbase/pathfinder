import { ElementType } from "react";

export type ScoutToolPlugin = {
  buttonCopy: ElementType;
  content: ElementType;
  name: string;
};

export type SchemaAwarePlugin = {
  buttonContent: ElementType;
  pluginContent: ElementType;
  name: string;
};

export type PluginsStoreState = {
  schemaAwarePlugins: SchemaAwarePlugin[];
  scoutTools: ScoutToolPlugin[];
};

export type PluginsStore = PluginsStoreState;
