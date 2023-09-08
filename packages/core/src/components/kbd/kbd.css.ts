import { contract, style } from "@pathfinder/style";

export const kbdClass = style({
  boxSizing: "border-box",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  height: contract.space[20],
  minWidth: contract.space[20],
  padding: `0 ${contract.space[4]}`,
  backgroundColor: contract.color.neutral[1],
  color: contract.color.neutral[12],
  borderRadius: contract.space[4],
  border: `1px solid ${contract.color.neutral[6]}`,
  fontSize: 11,
});
