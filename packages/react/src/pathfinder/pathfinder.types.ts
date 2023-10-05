import type { SchemaStoreState } from "@pathfinder-ide/stores";
import type { ThemeContractOverrides } from "@pathfinder-ide/style";

import { HTTPHeaderValue } from "@pathfinder-ide/stores/src/session-store/slices/http-headers/http-headers.types";

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
