import { Pathfinder } from "./pathfinder";

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

const fetcherOptions = {
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
      schemaProps={{
        fetcherOptions,
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
      schemaProps={{
        fetcherOptions,
      }}
      themeProps={{
        theme: { overrides },
      }}
    />
  );
};

export const MiniMode = () => {
  return (
    <Pathfinder
      mode="MINI"
      schemaProps={{
        fetcherOptions,
      }}
    />
  );
};

export const MiniModeWithoutSchemaProps = () => {
  return <Pathfinder mode="MINI" />;
};
