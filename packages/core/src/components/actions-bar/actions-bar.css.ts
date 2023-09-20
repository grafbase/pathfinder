import { contract, shared, style } from "@pathfinder/style";

export const actionsBarClass = style([
  shared.hairlineBorder({
    border: "bottom",
    onSurface: 1,
  }),
  {
    height: 48,
    display: "flex",
    flexShrink: 0,
    justifyContent: "space-between",
    alignItems: "center",
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
