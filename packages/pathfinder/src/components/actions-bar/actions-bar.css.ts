import { contract, style } from "@graphql-pathfinder/style";

export const actionsBarClass = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  minHeight: 48,
  paddingLeft: contract.space[12],
  borderBottom: `1px solid ${contract.color.neutral[3]}`,
});

export const actionsBarLeadClass = style({
  display: "flex",
  fontSize: contract.space[12],
  color: contract.color.neutral[11],
});

export const actionsBarLeftClass = style({
  display: "flex",
});

export const actionsBarRightClass = style({
  display: "flex",
  gap: contract.space[8],
  alignItems: "center",
});
