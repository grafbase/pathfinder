import { PluginSchemaAwareSchemaView } from "../plugin-schema-aware-schema-view";
import { PluginScoutHistory } from "../plugin-scout-history";
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
  {
    key: "Content-Type",
    value: "application/graphql-response+json",
  },
];

export const WithPathfinder = () => {
  return (
    <Trailblazer
      plugins={{
        schemaAwarePlugins: [PluginSchemaAwareSchemaView],
        scoutTools: [PluginScoutHistory],
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
        scoutTools: [PluginScoutHistory],
      }}
    />
  );
};

export const WithScoutPlugins = () => {
  return (
    <Trailblazer
      mode="MINI"
      plugins={{
        scoutTools: [PluginScoutHistory],
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
