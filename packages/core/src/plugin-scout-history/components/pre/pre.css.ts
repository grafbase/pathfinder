import { contract, style } from "@pathfinder/style";

export const preClass = style({
  padding: `${contract.space[4]} ${contract.space[16]} ${contract.space[16]} `,
  margin: 0,
  lineHeight: 1.5,
  color: contract.color.neutral[11],
  fontWeight: 400,
  fontSize: 10,
  fontFamily: contract.fonts.mono,
});
