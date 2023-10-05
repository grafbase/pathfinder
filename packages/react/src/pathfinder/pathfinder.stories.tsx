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

export const Full = () => {
  return (
    <Pathfinder
      schemaProps={{
        fetcherOptions,
      }}
    />
  );
};

export const FullWithoutSchemaProps = () => {
  return <Pathfinder />;
};

export const WithThemeOverrides = () => {
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

export const Mini = () => {
  return (
    <Pathfinder
      mode="MINI"
      schemaProps={{
        fetcherOptions,
      }}
    />
  );
};

export const MiniWithoutSchemaProps = () => {
  return <Pathfinder mode="MINI" />;
};
