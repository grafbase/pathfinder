import type { ThemeContractOverrides } from "@pathfinder-ide/style";

import { HTTPHeaderValue, SchemaStoreState } from "@pathfinder-ide/stores";

export type PathfinderProps = {
  mode?: "FULL" | "MINI";
  fetcherOptions?: {
    endpoint: string;
    headers?: Pick<HTTPHeaderValue, "key" | "value">[];
  };
  schemaPollingOptions?: Partial<
    Pick<SchemaStoreState["polling"], "enabled" | "interval">
  >;
  themeOptions?: {
    theme?: {
      overrides?: ThemeContractOverrides;
    };
  };
};
