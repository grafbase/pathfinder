import { PluginSchemaAwareSchemaView } from "../plugin-schema-aware-schema-view";
import { Trailblazer } from "./trailblazer";

const overrides = {
  dark: {
    color: {
      neutral: {
        5: "red",
      },
    },
  },
  light: {
    color: {
      neutral: {
        5: "blue",
      },
    },
    font: { body: "Comic Sans" },
  },
};

const headers = [
  {
    key: "x-api-key",
    value: import.meta.env.VITE_GRAPHQL_API_KEY,
  },
];

export const WithPathfinder = () => {
  return (
    <Trailblazer
      plugins={{
        schemaAwarePlugins: [PluginSchemaAwareSchemaView],
      }}
      schemaProps={{
        fetcherOptions: {
          endpoint: import.meta.env.VITE_GRAPHQL_ENDPOINT,
          headers,
        },
      }}
    />
  );
};

export const WithPathfinderWithoutSchemaProps = () => {
  return (
    <Trailblazer
      plugins={{
        schemaAwarePlugins: [PluginSchemaAwareSchemaView],
      }}
    />
  );
};

export const WithScoutPlugins = () => {
  return (
    <Trailblazer
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

export const WithThemeOverrides = () => {
  return (
    <Trailblazer
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

export const WithScout = () => {
  return (
    <Trailblazer
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

export const WithScoutWithoutSchemaProps = () => {
  return <Trailblazer mode="MINI" />;
};
