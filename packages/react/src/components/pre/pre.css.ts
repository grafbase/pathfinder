import { contract, recipe } from '@pathfinder-ide/style';

export const preClass = recipe({
  base: {
    margin: 0,
    lineHeight: 1.5,
    fontWeight: 400,
    fontSize: 11,
    fontFamily: contract.fonts.mono,
  },
  variants: {
    status: {
      info: {
        color: contract.color.neutral[10],
      },
      error: {
        color: contract.color.red[10],
      },
    },
  },
});
