import { pluginHistoryStore } from "./plugin-history-store";

import { createZustandSelectors } from "@graphql-pathfinder/shared";

export const usePluginHistoryStore = createZustandSelectors(pluginHistoryStore);
