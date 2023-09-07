import { contract, shared, style } from "@graphql-pathfinder/style";

export const historyItemRequestClass = style({
  padding: contract.space[16],
});

export const disclosureButtonClass = style([
  shared.resets.buttonReset,
  {
    display: "flex",
    gap: 4,
    alignItems: "center",
    height: 24,
    width: "100%",
    fontFamily: contract.fonts.mono,
    fontWeight: 600,
    fontSize: 10,
    textTransform: "uppercase",
    color: contract.color.neutral[12],
  },
]);
