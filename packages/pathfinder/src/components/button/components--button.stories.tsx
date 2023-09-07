import { Button } from "./button";

import { Trailblazer } from "../../trailblazer";
import { contract } from "@graphql-pathfinder/style";

export const Story = () => {
  return (
    <Trailblazer
      schemaProps={{
        fetcherOptions: {
          endpoint: "123",
        },
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 24,
          backgroundColor: contract.color.neutral[1],
        }}
      >
        <Button
          action={() => {
            console.log("button click");
          }}
          copy={"Button"}
          iconName="Caret"
          onSurface={1}
          size="medium"
          title="ButtonTitle"
          withBorder={true}
        />
        <Button
          action={() => {
            console.log("button click");
          }}
          copy={"Button"}
          iconName="Close"
          onSurface={3}
          size="medium"
          title="ButtonTitle"
          withBorder={false}
        />
      </div>
    </Trailblazer>
  );
};
