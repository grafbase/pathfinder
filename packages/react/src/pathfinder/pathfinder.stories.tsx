import { Pathfinder } from "./pathfinder";
import { PathfinderProps } from "./pathfinder.types";

const overrides = {
  dark: {
    color: {
      neutral: {
        1: "red",
      },
    },
  },
  light: {
    color: {
      neutral: {
        1: "blue",
      },
    },
  },
};

const fetcherOptions: PathfinderProps["fetcherOptions"] = {
  endpoint: import.meta.env.VITE_GRAPHQL_ENDPOINT,
  headers: [
    {
      key: import.meta.env.VITE_GRAPHQL_AUTHHEADER_KEY,
      value: import.meta.env.VITE_GRAPHQL_AUTHHEADER_VALUE,
    },
  ],
};

export const FullMode = () => {
  return (
    <Pathfinder
      fetcherOptions={fetcherOptions}
      schemaPollingOptions={{
        enabled: true,
      }}
    />
  );
};

export const FullModeWithoutSchemaProps = () => {
  return <Pathfinder />;
};

export const FullModeWithThemeOverrides = () => {
  return (
    <Pathfinder
      fetcherOptions={fetcherOptions}
      schemaPollingOptions={{
        enabled: true,
      }}
      themeOptions={{
        theme: { overrides },
      }}
    />
  );
};

export const MiniMode = () => {
  return <Pathfinder mode="MINI" fetcherOptions={fetcherOptions} />;
};

export const MiniModeWithoutSchemaProps = () => {
  return <Pathfinder mode="MINI" />;
};
