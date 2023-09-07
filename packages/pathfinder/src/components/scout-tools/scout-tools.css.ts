import { contract, style } from "@graphql-pathfinder/style";

export const scoutToolsClass = style({
  display: "flex",
  flexDirection: "column",
  height: "100%",
  width: "100%",
  position: "relative",
  backgroundColor: contract.color.neutral[2],
  borderTop: `1px solid ${contract.color.neutral[4]}`,
});
