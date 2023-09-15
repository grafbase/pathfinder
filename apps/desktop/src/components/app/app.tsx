import { Pathfinder, Trailblazer } from "@pathfinder/core";

export const App = () => {
  return (
    <Trailblazer
      schemaProps={{
        fetcherOptions: {
          endpoint: "https://graphql.earthdata.nasa.gov/api",
          headers: [],
        },
      }}
    >
      <Pathfinder />
    </Trailblazer>
  );
};
