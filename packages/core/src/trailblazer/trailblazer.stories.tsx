import { Pathfinder } from "../pathfinder";
import { addToHistory, PluginScoutHistory } from "../plugin-scout-history";
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

export const WithPathfinder = () => {
  return (
    <Trailblazer
      schemaProps={{
        fetcherOptions: {
          endpoint: import.meta.env.VITE_GRAPHQL_ENDPOINT,
          headers: [["x-api-key", import.meta.env.VITE_GRAPHQL_API_KEY]],
        },
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
        executionCallback: async ({ executionResponse }) => {
          if (executionResponse) {
            addToHistory({ executionResponse });
          }
        },
        fetcherOptions: {
          endpoint: import.meta.env.VITE_GRAPHQL_ENDPOINT,
          headers: [["x-api-key", import.meta.env.VITE_GRAPHQL_API_KEY]],
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
          headers: [["x-api-key", import.meta.env.VITE_GRAPHQL_API_KEY]],
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
          headers: [["x-api-key", import.meta.env.VITE_GRAPHQL_API_KEY]],
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
