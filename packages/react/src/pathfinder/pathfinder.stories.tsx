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

const fetcherOptions: PathfinderProps['fetcherOptions'] = {
  endpoint: import.meta.env.VITE_GRAPHQL_ENDPOINT,
  headers: [
    {
      key: import.meta.env.VITE_GRAPHQL_AUTHHEADER_KEY,
      value: import.meta.env.VITE_GRAPHQL_AUTHHEADER_VALUE,
    },
  ],
};

export const ReferenceMode = () => {
  return (
    <Pathfinder
      fetcherOptions={fetcherOptions}
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
      fetcherOptions={fetcherOptions}
      themeOptions={{
        defaultTheme: 'dark',
      }}
    />
  );
};

export const ReferenceModeWithDefaultThemeLight = () => {
  return (
    <Pathfinder
      fetcherOptions={fetcherOptions}
      themeOptions={{
        defaultTheme: 'light',
      }}
    />
  );
};

export const ReferenceModeWithDefaultThemeSystem = () => {
  return (
    <Pathfinder
      fetcherOptions={fetcherOptions}
      themeOptions={{
        defaultTheme: 'system',
      }}
    />
  );
};

export const ReferenceModeWithThemeOverrides = () => {
  return (
    <Pathfinder
      fetcherOptions={fetcherOptions}
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
  return <Pathfinder mode="IDE" fetcherOptions={fetcherOptions} />;
};

export const IDEModeWithoutSchemaProps = () => {
  return <Pathfinder mode="IDE" />;
};

export const ScoutMode = () => {
  return <Pathfinder mode="SCOUT" fetcherOptions={fetcherOptions} />;
};

export const ScoutModeWithoutSchemaProps = () => {
  return <Pathfinder mode="SCOUT" />;
};
