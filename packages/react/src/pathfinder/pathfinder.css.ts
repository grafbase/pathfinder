import { contract, style } from "@pathfinder-ide/style";

export const pathfinderClass = style({
  height: "100%",
  width: "100%",
  backgroundColor: contract.color.neutral[1],
});

export const connectWrapClass = style({
  height: "100%",
  width: "100%",
  backgroundColor: contract.color.neutral[1],
  paddingLeft: "25%",
  paddingRight: "25%",
  display: "flex",
  alignContent: "center",
  justifyContent: "center",
});
