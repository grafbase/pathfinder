import { Icon } from "../components/icon";
import { PluginSchemaAwareSchemaView as Component } from "./plugin-schema-aware-schema-view";

import { SchemaAwarePlugin } from "@pathfinder/stores";

export const PluginSchemaAwareSchemaView: SchemaAwarePlugin = {
  buttonContent: () => <Icon name="GraphQL" size="large" />,
  name: "plugin-schema-aware-schema-view",
  pluginContent: () => <Component />,
};
