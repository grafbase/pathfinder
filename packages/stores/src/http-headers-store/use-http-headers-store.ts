import { HTTPHeadersStore } from "./http-headers-store";

import { createZustandSelectors } from "@pathfinder/shared";

export const useHTTPHeadersStore = createZustandSelectors(HTTPHeadersStore);
