import { contract, style } from "@graphql-pathfinder/style";

export const scoutClass = style({
  height: "100%",
  width: "100%",
  display: "flex",
  backgroundColor: contract.color.neutral[1],
  fontFamily: contract.fonts.body,
  color: contract.color.neutral[12],
});
