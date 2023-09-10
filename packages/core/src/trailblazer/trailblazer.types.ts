import type { SchemaStoreState } from "@pathfinder/stores";
import type { ThemeContractOverrides } from "@pathfinder/style";

import { PluginsStoreState } from "@pathfinder/stores";

type SchemaStoreProps = Pick<
  SchemaStoreState,
  "fetcherOptions" | "withPolling"
>;

type PathfinderPlugins = {
  scoutTools: PluginsStoreState["scoutTools"];
};

export type TrailblazerProps = {
  children: React.ReactNode;
  plugins?: PathfinderPlugins;
  schemaProps: SchemaStoreProps;
  themeProps?: {
    theme?: {
      overrides?: ThemeContractOverrides;
    };
  };
};
