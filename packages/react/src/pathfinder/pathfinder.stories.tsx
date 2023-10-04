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

const headers = [
  {
    key: "x-api-key",
    value: import.meta.env.VITE_GRAPHQL_API_KEY,
  },
];

export const Full = () => {
  return (
    <Pathfinder
      schemaProps={{
        fetcherOptions: {
          endpoint: import.meta.env.VITE_GRAPHQL_ENDPOINT,
          headers,
        },
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
        fetcherOptions: {
          endpoint: import.meta.env.VITE_GRAPHQL_ENDPOINT,
          headers,
        },
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
        fetcherOptions: {
          endpoint: import.meta.env.VITE_GRAPHQL_ENDPOINT,
          headers,
        },
      }}
    />
  );
};

export const MiniWithoutSchemaProps = () => {
  return <Pathfinder mode="MINI" />;
};
