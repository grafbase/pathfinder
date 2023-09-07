import { ScoutToolPlugin } from "@graphql-pathfinder/stores";

import { PluginScoutHistory as Component } from "./components/plugin-scout-history";

export { addToHistory } from "./store";

export const PluginScoutHistory: ScoutToolPlugin = {
  buttonCopy: () => "History",
  name: "scout-history-plugin",
  content: () => <Component />,
};
