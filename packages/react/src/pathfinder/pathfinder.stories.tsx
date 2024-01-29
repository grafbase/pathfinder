import { useState } from 'react';
import { Pathfinder } from './pathfinder';
import { PathfinderProps } from './pathfinder.types';
import { testSchema } from '@pathfinder-ide/stores/src/schema-store/test-schema';

const overrides = {
  dark: {
    color: {
      neutral: {
        1: 'red',
      },
    },
  },
  light: {
    color: {
      neutral: {
        1: 'blue',
      },
    },
    font: { body: 'Comic Sans' },
  },
};

type ToggleReferenceProps = {
  fetcherOptions: PathfinderProps['fetcherOptions'];
  name: 'NASA_API' | 'LOCAL_ENDPOINT';
};

const LOCAL_ENDPOINT: ToggleReferenceProps = {
  name: 'LOCAL_ENDPOINT',
  fetcherOptions: {
    endpoint: import.meta.env.VITE_LOCAL_GRAPHQL_ENDPOINT,
  },
};

const NASA_API: ToggleReferenceProps = {
  name: 'NASA_API',
  fetcherOptions: {
    endpoint: 'https://graphql.earthdata.nasa.gov/api',
  },
};

export const ToggleReference = () => {
  const [endpoint, setEndpoint] = useState<ToggleReferenceProps>(NASA_API);
  const [visibleTogglePane, setVisibleTogglePane] = useState<
    null | 'NASA_API' | 'LOCAL_ENDPOINT'
  >(null);
  console.log('ToggleReference', { endpoint });
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateRows: '60px 1fr',
        height: '100%',
        width: '100%',
        overflow: 'hidden',
      }}
    >
      <div
        style={{ display: 'flex', gap: 12, height: 60, justifyContent: 'space-between' }}
      >
        <div>
          <button
            style={{
              padding: 12,
              backgroundColor: 'white',
              color: 'black',
              opacity: endpoint.name === 'LOCAL_ENDPOINT' ? 1 : 0.35,

              cursor: 'pointer',
            }}
            onClick={() => {
              setEndpoint(LOCAL_ENDPOINT);
              setVisibleTogglePane(null);
            }}
          >
            Local yoga server
          </button>
          <button
            style={{
              padding: 12,
              backgroundColor: 'white',
              color: 'black',
              opacity: endpoint.name === 'NASA_API' ? 1 : 0.35,
              cursor: 'pointer',
            }}
            onClick={() => {
              setEndpoint(NASA_API);
              setVisibleTogglePane(null);
            }}
          >
            NASA API
          </button>
        </div>
        <div>
          <button
            style={{
              padding: 12,
              backgroundColor: visibleTogglePane === 'LOCAL_ENDPOINT' ? 'green' : 'red',
              color: 'black',
              cursor: 'pointer',
            }}
            onClick={() => setVisibleTogglePane('LOCAL_ENDPOINT')}
          >
            Local yoga server
          </button>
          <button
            style={{
              padding: 12,
              backgroundColor: visibleTogglePane === 'NASA_API' ? 'green' : 'red',
              cursor: 'pointer',
            }}
            onClick={() => setVisibleTogglePane('NASA_API')}
          >
            NASA API
          </button>
        </div>
      </div>
      {visibleTogglePane === null && (
        <Pathfinder fetcherOptions={endpoint.fetcherOptions} />
      )}
      {visibleTogglePane === 'LOCAL_ENDPOINT' && (
        <Pathfinder fetcherOptions={LOCAL_ENDPOINT.fetcherOptions} />
      )}
      {visibleTogglePane === 'NASA_API' && (
        <Pathfinder fetcherOptions={NASA_API.fetcherOptions} />
      )}
    </div>
  );
};

export const ReferenceModeLocalAPI = () => {
  return (
    <Pathfinder
      fetcherOptions={LOCAL_ENDPOINT.fetcherOptions}
      schemaPollingOptions={{
        enabled: true,
      }}
    />
  );
};

export const ReferenceModeNASA = () => {
  return (
    <Pathfinder
      fetcherOptions={{
        endpoint: 'https://graphql.earthdata.nasa.gov/api',
      }}
      schemaPollingOptions={{
        enabled: true,
      }}
    />
  );
};

export const ReferenceModeWithoutSchemaProps = () => {
  return <Pathfinder />;
};

export const ReferenceModeWithDefaultThemeDark = () => {
  return (
    <Pathfinder
      fetcherOptions={LOCAL_ENDPOINT.fetcherOptions}
      themeOptions={{
        defaultTheme: 'dark',
      }}
    />
  );
};

export const ReferenceModeWithDefaultThemeLight = () => {
  return (
    <Pathfinder
      fetcherOptions={LOCAL_ENDPOINT.fetcherOptions}
      themeOptions={{
        defaultTheme: 'light',
      }}
    />
  );
};

export const ReferenceModeWithDefaultThemeSystem = () => {
  return (
    <Pathfinder
      fetcherOptions={LOCAL_ENDPOINT.fetcherOptions}
      themeOptions={{
        defaultTheme: 'system',
      }}
    />
  );
};

export const ReferenceModeWithThemeOverrides = () => {
  return (
    <Pathfinder
      fetcherOptions={LOCAL_ENDPOINT.fetcherOptions}
      schemaPollingOptions={{
        enabled: true,
      }}
      themeOptions={{
        overrides,
      }}
    />
  );
};

export const ReferenceModeWithLocalGraphQLServer = () => {
  return (
    <Pathfinder
      fetcherOptions={{
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        endpoint: LOCAL_ENDPOINT.fetcherOptions!.endpoint,
      }}
      // the local server doesn't provide this response header, so we shouldn't see values here
      watchHeaders={[
        {
          headerName: 'x-grafbase-cache',
          responseMap: {
            HIT: { value: 'CACHE: HIT', color: 'green' },
            MISS: { value: 'CACHE: MISS', color: 'red' },
            UPDATING: { value: 'CACHE: UPDATING', color: 'blue' },
            STALE: { value: 'CACHE: STALE', color: 'purple' },
            BYPASS: { value: 'CACHE: BYPASS', color: 'yellow' },
          },
        },
      ]}
    />
  );
};

export const ReferenceModeWithRemoteGraphQLServer = () => {
  return (
    <Pathfinder
      fetcherOptions={{
        endpoint: import.meta.env.VITE_REMOTE_GRAPHQL_ENDPOINT,
        headers: [
          {
            key: 'x-api-key',
            value: import.meta.env.VITE_REMOTE_GRAPHQL_API_KEY,
          },
        ],
      }}
      watchHeaders={[
        {
          headerName: 'x-grafbase-cache',
          responseMap: {
            HIT: { value: 'CACHE: HIT', color: 'green' },
            MISS: { value: 'CACHE: MISS', color: 'red' },
            UPDATING: { value: 'CACHE: UPDATING', color: 'blue' },
            STALE: { value: 'CACHE: STALE', color: 'purple' },
            BYPASS: { value: 'CACHE: BYPASS', color: 'yellow' },
          },
        },
      ]}
    />
  );
};

export const IDEMode = () => {
  return <Pathfinder mode="IDE" fetcherOptions={LOCAL_ENDPOINT.fetcherOptions} />;
};

export const IDEModeWithSchema = () => {
  return (
    <Pathfinder
      mode="IDE"
      fetcherOptions={LOCAL_ENDPOINT.fetcherOptions}
      schema={testSchema}
    />
  );
};

export const IDEModeWithoutSchema = () => {
  return <Pathfinder mode="IDE" fetcherOptions={LOCAL_ENDPOINT.fetcherOptions} />;
};

export const IDEModeWithoutFetcherOptions = () => {
  return <Pathfinder mode="IDE" />;
};

export const ScoutMode = () => {
  return <Pathfinder mode="SCOUT" fetcherOptions={LOCAL_ENDPOINT.fetcherOptions} />;
};

export const ScoutModeWithoutSchemaProps = () => {
  return <Pathfinder mode="SCOUT" />;
};
