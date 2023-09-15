import { pluginsStore } from "./plugins-store";

import { createZustandSelectors } from "@pathfinder/shared";

export const usePluginsStore = createZustandSelectors(pluginsStore);
