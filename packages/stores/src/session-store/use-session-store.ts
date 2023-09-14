import { sessionStore } from "./session-store";

import { createZustandSelectors } from "@pathfinder/shared";

export const useSessionStore = createZustandSelectors(sessionStore);
