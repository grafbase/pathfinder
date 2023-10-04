import { contract, style } from "@pathfinder/style";

export const schemaViewClass = style({
  boxSizing: "border-box",
  height: "100%",
  width: "100%",
  padding: 12,
});

export const schemaViewInnerClass = style({
  height: "100%",
  width: "100%",
  border: `1px solid ${contract.color.neutral[4]}`,
  paddingTop: 12,
  paddingBottom: 12,
});
