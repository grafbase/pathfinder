import { pluginHistoryStore } from "./plugin-history-store";

import { createZustandSelectors } from "@pathfinder/shared";

export const usePluginHistoryStore = createZustandSelectors(pluginHistoryStore);
