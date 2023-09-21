import type { SchemaStoreState } from "@pathfinder/stores";
import type { ThemeContractOverrides } from "@pathfinder/style";

import { PluginsStoreState } from "@pathfinder/stores";
import { HTTPHeaderValue } from "@pathfinder/stores/src/session-store/slices/http-headers/http-headers.types";

type SchemaStoreProps = Pick<SchemaStoreState, "withPolling"> & {
  fetcherOptions: {
    endpoint: string | null;
    headers?: Pick<HTTPHeaderValue, "key" | "value">[];
  };
};

type PathfinderPlugins = {
  schemaAwarePlugins?: PluginsStoreState["schemaAwarePlugins"];
  scoutTools?: PluginsStoreState["scoutTools"];
};

export type TrailblazerProps = {
  mode?: "FULL" | "MINI";
  plugins?: PathfinderPlugins;
  schemaProps?: SchemaStoreProps;
  themeProps?: {
    theme?: {
      overrides?: ThemeContractOverrides;
    };
  };
};
