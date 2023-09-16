import { contract, shared, style } from "@pathfinder/style";

export const actionsBarClass = style([
  shared.hairlineBorder({
    border: "bottom",
    onSurface: 1,
  }),
  {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: 48,
  },
]);

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
