import { Dropdown } from "../dropdown";

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
        <Dropdown
          buttons={[
            {
              action: () => {
                console.log("button click1");
              },
              copy: "Button1",
              iconName: "Caret",
              onSurface: 3,
              size: "medium",
              title: "ButtonTitle1",
              width: "100%",
              withBorder: false,
            },
            {
              action: () => {
                console.log("button click2");
              },
              copy: "Button2",
              iconName: "Caret",
              onSurface: 3,
              size: "medium",
              title: "ButtonTitle2",
              width: "100%",
              withBorder: false,
            },
            {
              action: () => {
                console.log("button click3");
              },
              copy: "Button3",
              iconName: "Caret",
              onSurface: 3,
              size: "medium",
              title: "ButtonTitle3",
              width: "100%",
              withBorder: false,
            },
          ]}
          iconButtonProps={{
            iconName: "Prettier",
            onSurface: 1,
            size: "medium",
            title: "dropdown!",
          }}
        />
      </div>
    </Trailblazer>
  );
};
