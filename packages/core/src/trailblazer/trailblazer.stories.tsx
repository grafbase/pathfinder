import { Pathfinder } from "../pathfinder";
import { PluginSchemaAwareSchemaView } from "../plugin-schema-aware-schema-view";
import { PluginScoutHistory } from "../plugin-scout-history";
import { Scout } from "../scout";
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
    >
      <Pathfinder />
    </Trailblazer>
  );
};

export const WithPathfinderWithoutSchemaProps = () => {
  return (
    <Trailblazer
      plugins={{
        schemaAwarePlugins: [PluginSchemaAwareSchemaView],
        scoutTools: [PluginScoutHistory],
      }}
    >
      <Pathfinder />
    </Trailblazer>
  );
};

export const WithScoutPlugins = () => {
  return (
    <Trailblazer
      plugins={{
        scoutTools: [PluginScoutHistory],
      }}
      schemaProps={{
        fetcherOptions: {
          endpoint: import.meta.env.VITE_GRAPHQL_ENDPOINT,
          headers,
        },
      }}
    >
      <Scout />
    </Trailblazer>
  );
};

export const WithScout = () => {
  return (
    <Trailblazer
      schemaProps={{
        fetcherOptions: {
          endpoint: import.meta.env.VITE_GRAPHQL_ENDPOINT,
          headers,
        },
      }}
    >
      <Scout />
    </Trailblazer>
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
    >
      <Scout />
    </Trailblazer>
  );
};

export const WithScoutWithoutSchemaProps = () => {
  return (
    <Trailblazer>
      <Scout />
    </Trailblazer>
  );
};
