import { contract, recipe } from "@pathfinder-ide/style";

export const delimiterClass = recipe({
  base: {
    color: contract.color.neutral[10],
  },
  variants: {
    spacing: {
      LEFT: { paddingLeft: 2 },
      RIGHT: { paddingRight: 2 },
      LEFT_AND_RIGHT: { paddingLeft: 2, paddingRight: 2 },
    },
  },
});
