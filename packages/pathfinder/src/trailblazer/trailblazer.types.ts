import type { SchemaStoreState } from "@graphql-pathfinder/stores";
import type { ThemeContractOverrides } from "@graphql-pathfinder/style";

import { PluginsStoreState } from "@graphql-pathfinder/stores";

type SchemaStoreProps = Pick<
  SchemaStoreState,
  "executionCallback" | "fetcherOptions" | "withPolling"
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
