import { contract, recipe } from "@pathfinder/style";

export const preClass = recipe({
  base: {
    margin: 0,
    lineHeight: 1.5,
    fontWeight: 400,
    fontSize: 10,
    fontFamily: contract.fonts.mono,
  },
  variants: {
    status: {
      info: {
        color: contract.color.neutral[8],
      },
      error: {
        color: contract.color.red[8],
      },
    },
  },
});
