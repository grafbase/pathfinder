import { useEffect } from "react";
import { get as findSession } from "idb-keyval";

import { STORAGE_NAME_SESSION, generateCuid } from "@pathfinder/shared";

import {
  getNamespacedStorageName,
  initializeTheme,
  usePluginsStore,
  resetSchemaPolling,
  useSchemaStore,
  initSession,
  loadSession,
} from "@pathfinder/stores";

import { Connect } from "../components/connect";
import { Pathfinder } from "../pathfinder";
import { Scout } from "../scout";

import { connectWrapClass, trailblazerClass } from "./trailblazer.css";

import type { TrailblazerProps } from "./trailblazer.types";

export const Trailblazer = ({
  mode = "FULL",
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

    // if the implementer has provided an endpoint via props, we use the endpoint to namespace the local storage
    if (schemaProps && schemaProps.fetcherOptions.endpoint) {
      const name = getNamespacedStorageName({
        endpoint: schemaProps.fetcherOptions.endpoint as string,
        storageName: STORAGE_NAME_SESSION,
      });

      // look up an existing session based on this endpoint
      findSession(name).then((session) => {
        if (session) {
          loadSession({ sessionName: name });
        } else {
          // we don't have an existing session using this endpoint, so let's initialize a new session
          initSession({
            fetchOptions: {
              endpoint: schemaProps.fetcherOptions.endpoint as string,
              headers: schemaProps.fetcherOptions.headers?.map((header) => ({
                id: generateCuid({}),
                enabled: true,
                key: header.key,
                value: header.value,
              })),
            },
          });
        }
      });
    }

    return () => {
      // clear our polling timer if it exists
      resetSchemaPolling();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [schemaProps?.fetcherOptions.endpoint]);

  if (schema) {
    return (
      <div className={trailblazerClass}>
        {mode === "FULL" && (
          <Pathfinder withSchemaProps={schemaProps ? true : false} />
        )}
        {mode === "MINI" && <Scout />}
      </div>
    );
  }

  if (!schemaProps) {
    return (
      <div className={connectWrapClass}>
        <Connect />
      </div>
    );
  }
};
