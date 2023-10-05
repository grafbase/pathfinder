import { contract, shared, style } from "@pathfinder-ide/style";

export const historyItemRequestClass = style({
  padding: contract.space[12],
});

export const disclosureButtonClass = style([
  shared.resets.buttonReset,
  {
    display: "flex",
    gap: 2,
    alignItems: "center",
    height: 24,
    width: "100%",
    fontFamily: contract.fonts.mono,
    fontWeight: 500,
    fontSize: 9,
    textTransform: "uppercase",
    color: contract.color.neutral[12],
  },
]);

export const disclosurePanelClass = style({
  padding: `${contract.space[4]} ${contract.space[16]} ${contract.space[16]} `,
});
