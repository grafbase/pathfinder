import { useEffect } from "react";
import { init as initCuid } from "@paralleldrive/cuid2";

import { STORAGE_NAME_SESSION } from "@pathfinder/shared";

import {
  getNamespacedStorageName,
  initializeTheme,
  loadSchema,
  usePluginsStore,
  resetSchemaPolling,
  useSessionStore,
  useSchemaStore,
} from "@pathfinder/stores";

import { CompassAnimated } from "../components/compass-animated";
import { Welcome } from "../components/welcome";

import { trailblazerClass } from "./trailblazer.css";

import type { TrailblazerProps } from "./trailblazer.types";

export const Trailblazer = ({
  children,
  plugins,
  schemaProps,
  themeProps,
}: TrailblazerProps) => {
  const schema = useSchemaStore.use.schema();

  useEffect(() => {
    // set the theme and handle overrides if provided
    initializeTheme({ overrides: themeProps?.theme?.overrides });

    // set our plugins into state
    usePluginsStore.setState({
      ...plugins,
    });

    if (schemaProps) {
      // if the implementer has provided an endpoint via props, we use the endpoint to namespace the local storage
      if (schemaProps.fetcherOptions.endpoint) {
        const name = getNamespacedStorageName({
          endpoint: schemaProps.fetcherOptions.endpoint,
          storageName: STORAGE_NAME_SESSION,
        });

        useSessionStore.persist.setOptions({
          name,
        });

        // manually rehydrate
        useSessionStore.persist.rehydrate();

        loadSchema({
          fetchOptions: {
            endpoint: schemaProps.fetcherOptions.endpoint,
            headers: schemaProps.fetcherOptions.headers?.map((header) => [
              header.key,
              header.value,
            ]),
          },
        });

        // write our fetcherOptions into session state/storage after a short timeout to prevent hydration collisions
        setTimeout(() => {
          useSessionStore.setState({
            endpoint: schemaProps.fetcherOptions.endpoint,
            headers: schemaProps.fetcherOptions.headers?.map((header) => ({
              id: initCuid({ length: 10 })(),
              enabled: true,
              key: header.key,
              value: header.value,
            })),
          });
        }, 100);
      }
    }

    return () => {
      // clear our polling timer if it exists
      resetSchemaPolling();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (schema) {
    return <div className={trailblazerClass}>{children}</div>;
  }

  if (!schemaProps) {
    return <Welcome />;
  }

  return <CompassAnimated size="small" speed="standard" />;
};
