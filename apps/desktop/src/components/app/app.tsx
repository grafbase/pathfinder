import { Pathfinder, Trailblazer } from "@pathfinder/core";

export const App = () => {
  return (
    <Trailblazer
      schemaProps={{
        fetcherOptions: {
          endpoint: "http://localhost:4000/graphql",
          headers: [["x-api-key", ""]],
        },
      }}
    >
      <Pathfinder />
    </Trailblazer>
  );
};
