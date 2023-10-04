import type { SchemaStoreState } from "@pathfinder/stores";
import type { ThemeContractOverrides } from "@pathfinder/style";

import { HTTPHeaderValue } from "@pathfinder/stores/src/session-store/slices/http-headers/http-headers.types";

type SchemaStoreProps = Pick<SchemaStoreState, "withPolling"> & {
  fetcherOptions: {
    endpoint: string | null;
    headers?: Pick<HTTPHeaderValue, "key" | "value">[];
  };
};

export type PathfinderProps = {
  mode?: "FULL" | "MINI";
  schemaProps?: SchemaStoreProps;
  themeProps?: {
    theme?: {
      overrides?: ThemeContractOverrides;
    };
  };
};
