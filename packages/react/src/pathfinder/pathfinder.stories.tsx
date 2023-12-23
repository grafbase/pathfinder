import { useState } from 'react';
import { Pathfinder } from './pathfinder';
import { PathfinderProps } from './pathfinder.types';

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
  },
};

type ToggleReferenceProps = {
  fetcherOptions: PathfinderProps['fetcherOptions'];
  name: 'NASA_API' | 'ENV_API';
};

const ENV_API: ToggleReferenceProps = {
  name: 'ENV_API',
  fetcherOptions: {
    endpoint: import.meta.env.VITE_GRAPHQL_ENDPOINT,
    headers: [
      {
        key: import.meta.env.VITE_GRAPHQL_AUTHHEADER_KEY,
        value: import.meta.env.VITE_GRAPHQL_AUTHHEADER_VALUE,
      },
    ],
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
    null | 'NASA_API' | 'ENV_API'
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
              opacity: endpoint.name === 'ENV_API' ? 1 : 0.35,

              cursor: 'pointer',
            }}
            onClick={() => {
              setEndpoint(ENV_API);
              setVisibleTogglePane(null);
            }}
          >
            ENV API
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
              backgroundColor: visibleTogglePane === 'ENV_API' ? 'green' : 'red',
              color: 'black',
              cursor: 'pointer',
            }}
            onClick={() => setVisibleTogglePane('ENV_API')}
          >
            ENV API
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
      {visibleTogglePane === 'ENV_API' && (
        <Pathfinder fetcherOptions={ENV_API.fetcherOptions} />
      )}
      {visibleTogglePane === 'NASA_API' && (
        <Pathfinder fetcherOptions={NASA_API.fetcherOptions} />
      )}
    </div>
  );
};

export const ReferenceModeENVAPI = () => {
  return (
    <Pathfinder
      fetcherOptions={ENV_API.fetcherOptions}
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
      fetcherOptions={ENV_API.fetcherOptions}
      themeOptions={{
        defaultTheme: 'dark',
      }}
    />
  );
};

export const ReferenceModeWithDefaultThemeLight = () => {
  return (
    <Pathfinder
      fetcherOptions={ENV_API.fetcherOptions}
      themeOptions={{
        defaultTheme: 'light',
      }}
    />
  );
};

export const ReferenceModeWithDefaultThemeSystem = () => {
  return (
    <Pathfinder
      fetcherOptions={ENV_API.fetcherOptions}
      themeOptions={{
        defaultTheme: 'system',
      }}
    />
  );
};

export const ReferenceModeWithThemeOverrides = () => {
  return (
    <Pathfinder
      fetcherOptions={ENV_API.fetcherOptions}
      schemaPollingOptions={{
        enabled: true,
      }}
      themeOptions={{
        overrides,
      }}
    />
  );
};

export const IDEMode = () => {
  return <Pathfinder mode="IDE" fetcherOptions={ENV_API.fetcherOptions} />;
};

export const IDEModeWithoutSchemaProps = () => {
  return <Pathfinder mode="IDE" />;
};

export const ScoutMode = () => {
  return <Pathfinder mode="SCOUT" fetcherOptions={ENV_API.fetcherOptions} />;
};

export const ScoutModeWithoutSchemaProps = () => {
  return <Pathfinder mode="SCOUT" />;
};
