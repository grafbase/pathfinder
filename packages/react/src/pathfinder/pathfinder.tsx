import { useEffect, useState } from 'react';
import { get as findSession } from 'idb-keyval';

import { STORAGE_NAME_SESSION, generateCuid } from '@pathfinder-ide/shared';

import {
  getNamespacedStorageName,
  initializeTheme,
  useSchemaStore,
  initSession,
  loadSession,
  schemaStore,
  uiStore,
  cleanupStores,
} from '@pathfinder-ide/stores';

import { Connect, CompassAnimated } from '../components';
import { Scout } from '../scout';
import { Reference } from '../reference';

import { connectWrapClass, pathfinderClass } from './pathfinder.css';

import type { PathfinderProps } from './pathfinder.types';
import { IDE } from '../ide';

export const Pathfinder = ({
  mode = 'REFERENCE',
  fetcherOptions,
  schemaPollingOptions,
  themeOptions,
}: PathfinderProps) => {
  const schema = useSchemaStore.use.schema();

  const [isHydrated, setIsHydrated] = useState<boolean>(false);

  useEffect(() => {
    uiStore.subscribe(({ isHydrated }) => {
      setIsHydrated(isHydrated);
    });

    return () => {
      cleanupStores();
    };
  }, []);

  useEffect(() => {
    // set the theme and handle overrides if provided
    initializeTheme({ options: themeOptions });

    //set our schema polling options if provided
    if (schemaPollingOptions) {
      const currentVals = schemaStore.getState().polling;
      schemaStore.setState({
        polling: {
          ...(schemaPollingOptions.enabled
            ? { enabled: schemaPollingOptions.enabled }
            : { enabled: currentVals.enabled }),
          ...(schemaPollingOptions.interval
            ? { interval: schemaPollingOptions.interval }
            : { interval: currentVals.interval }),
          timer: currentVals.timer,
        },
      });
    }

    // if the implementer has provided an endpoint via props, we use the endpoint to namespace the local storage
    if (fetcherOptions) {
      const name = getNamespacedStorageName({
        endpoint: fetcherOptions.endpoint as string,
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
              endpoint: fetcherOptions.endpoint as string,
              headers: fetcherOptions.headers?.map((header) => ({
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
  }, [fetcherOptions, schemaPollingOptions, themeOptions]);

  if (!fetcherOptions && !schema) {
    return (
      <div className={connectWrapClass} data-tauri-drag-region="">
        <Connect />
      </div>
    );
  }

  if (!isHydrated) {
    return null;
  }

  if (fetcherOptions && !schema) {
    <CompassAnimated size="large" speed="standard" />;
  }

  return (
    <div className={pathfinderClass}>
      {mode === 'REFERENCE' && (
        <Reference withFetcherOptions={fetcherOptions ? true : false} />
      )}
      {mode === 'IDE' && <IDE />}
      {mode === 'SCOUT' && <Scout />}
    </div>
  );
};
