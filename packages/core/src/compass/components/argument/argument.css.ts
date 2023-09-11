import { contract, style } from "@pathfinder/style";

export const argumentClass = style({
  display: "flex",
  position: "relative",
  paddingLeft: 16,

  selectors: {
    "&::before": {
      content: "",
      position: "absolute",
      top: 10,
      left: 2,
      height: 1,
      width: 6,
      backgroundColor: contract.color.neutral[4],
    },
  },
});
