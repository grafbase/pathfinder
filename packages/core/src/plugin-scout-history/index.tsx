import { ScoutToolPlugin } from "@pathfinder/stores";

import { PluginScoutHistory as Component } from "./components/plugin-scout-history";

export const PluginScoutHistory: ScoutToolPlugin = {
  buttonCopy: () => "History",
  name: "scout-history-plugin",
  content: () => <Component />,
};
