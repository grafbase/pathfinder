import { useEffect } from "react";

import {
  STORAGE_NAME_GRAPHQL_DOCUMENT,
  STORAGE_NAME_HTTP_HEADERS,
} from "@pathfinder/shared";
import {
  getNamespacedStorageName,
  graphQLDocumentStore,
  initializeTheme,
  loadSchema,
  resetSchemaPolling,
  useGraphQLDocumentStore,
  useSchemaStore,
  useThemeStore,
  HTTPHeadersStore,
  pluginsStore,
  schemaStore,
} from "@pathfinder/stores";

import { Spinner } from "../components/spinner";

import { trailblazerClass } from "./trailblazer.css";

import type { TrailblazerProps } from "./trailblazer.types";

export const Trailblazer = ({
  children,
  plugins,
  schemaProps,
  themeProps,
}: TrailblazerProps) => {
  const activeTheme = useThemeStore.use.activeTheme();

  const hasHydrated = useGraphQLDocumentStore.use._hasHydrated();

  useEffect(() => {
    initializeTheme({ overrides: themeProps?.theme?.overrides });

    pluginsStore.setState({
      ...plugins,
    });

    schemaStore.setState({
      ...schemaProps,
    });

    loadSchema();

    return () => {
      // clear our polling timer if it exists
      resetSchemaPolling();
    };
  }, [plugins, schemaProps, themeProps]);

  // trigger our store rehydration once
  useEffect(() => {
    const endpoint = useSchemaStore.getState().fetcherOptions?.endpoint;

    if (endpoint) {
      graphQLDocumentStore.persist.setOptions({
        name: getNamespacedStorageName({
          endpoint,
          storageName: STORAGE_NAME_GRAPHQL_DOCUMENT,
        }),
      });
      HTTPHeadersStore.persist.setOptions({
        name: getNamespacedStorageName({
          endpoint,
          storageName: STORAGE_NAME_HTTP_HEADERS,
        }),
      });
      graphQLDocumentStore.persist.rehydrate();
      HTTPHeadersStore.persist.rehydrate();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!activeTheme || !hasHydrated) {
    return <Spinner variant={{ size: 24 }} />;
  }

  return <div className={trailblazerClass}>{children}</div>;
};
