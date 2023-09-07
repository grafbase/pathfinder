import { HTTPHeadersStore } from "./http-headers-store";

import { createZustandSelectors } from "@graphql-pathfinder/shared";

export const useHTTPHeadersStore = createZustandSelectors(HTTPHeadersStore);
