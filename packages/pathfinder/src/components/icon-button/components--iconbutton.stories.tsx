import { contract } from "@graphql-pathfinder/style";
import { Trailblazer } from "../../trailblazer";
import { IconButton } from "./icon-button";

const buttonClick = () => {
  alert("buttonClick!");
};

export const Sizes = () => {
  return (
    <Trailblazer
      schemaProps={{
        fetcherOptions: {
          endpoint: "123",
          headers: [["x-api-key", "123"]],
        },
      }}
    >
      <div
        style={{
          display: "flex",
          gap: "24px",
          padding: "24px",
          backgroundColor: contract.color.neutral[1],
          color: contract.color.neutral[10],
        }}
      >
        <div>
          <span>small</span>
          <IconButton
            action={buttonClick}
            iconName="Prettier"
            onSurface={1}
            size="small"
            title={`I'm a small IconButton!`}
          />
        </div>
        <div>
          <span>medium</span>
          <IconButton
            action={buttonClick}
            iconName="Prettier"
            onSurface={1}
            size="medium"
            title={`I'm a medium IconButton!`}
          />
        </div>
        <div>
          <span>large</span>
          <IconButton
            action={buttonClick}
            iconName="Prettier"
            onSurface={1}
            size="large"
            title={`I'm a large IconButton!`}
          />
          <IconButton
            action={buttonClick}
            iconName="Prettier"
            isActive={true}
            onSurface={1}
            size="large"
            title={`I'm a large IconButton!`}
          />
        </div>
      </div>
      <div
        style={{
          display: "flex",
          gap: "24px",
          padding: "24px",
          backgroundColor: contract.color.neutral[2],
          color: contract.color.neutral[10],
        }}
      >
        <div>
          <span>small</span>
          <IconButton
            action={buttonClick}
            iconName="Prettier"
            onSurface={2}
            size="small"
            title={`I'm a small IconButton!`}
          />
        </div>
        <div>
          <span>medium</span>
          <IconButton
            action={buttonClick}
            iconName="Prettier"
            onSurface={2}
            size="medium"
            title={`I'm a medium IconButton!`}
          />
        </div>
        <div>
          <span>large</span>
          <IconButton
            action={buttonClick}
            iconName="Prettier"
            onSurface={2}
            size="large"
            title={`I'm a large IconButton!`}
          />
          <IconButton
            action={buttonClick}
            iconName="Prettier"
            isActive={true}
            onSurface={2}
            size="large"
            title={`I'm a large IconButton!`}
          />
        </div>
      </div>
      <div
        style={{
          display: "flex",
          gap: "24px",
          padding: "24px",
          backgroundColor: contract.color.neutral[3],
          color: contract.color.neutral[10],
        }}
      >
        <div>
          <span>small</span>
          <IconButton
            action={buttonClick}
            iconName="Prettier"
            onSurface={3}
            size="small"
            title={`I'm a small IconButton!`}
          />
        </div>
        <div>
          <span>medium</span>
          <IconButton
            action={buttonClick}
            iconName="Prettier"
            onSurface={3}
            size="medium"
            title={`I'm a medium IconButton!`}
          />
        </div>
        <div>
          <span>large</span>
          <IconButton
            action={buttonClick}
            iconName="Prettier"
            onSurface={3}
            size="large"
            title={`I'm a large IconButton!`}
          />
          <IconButton
            action={buttonClick}
            iconName="Prettier"
            isActive={true}
            onSurface={3}
            size="large"
            title={`I'm a large IconButton!`}
          />
        </div>
      </div>
    </Trailblazer>
  );
};
