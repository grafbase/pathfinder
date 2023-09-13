import { Pathfinder, Trailblazer } from "@pathfinder/core";

export const App = () => {
  return (
    <Trailblazer
      schemaProps={{
        fetcherOptions: {
          endpoint: "http://localhos]t:4000/graphql",
          headers: [["x-api-key", ""]],
        },
      }}
    >
      <Pathfinder />
    </Trailblazer>
  );
};
