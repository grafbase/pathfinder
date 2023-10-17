import { contract, recipe, style } from "@pathfinder-ide/style";

export const argumentListClass = style({
  display: "flex",
  flexDirection: "column",
  gap: 10,
  paddingTop: 8,
  paddingRight: 0,
  paddingBottom: 8,
  paddingLeft: 12,
});

export const argumentClass = recipe({
  base: {},

  variants: {
    showBorder: {
      true: {
        borderLeft: `1px solid ${contract.color.neutral[4]}`,
        marginLeft: -12,
        paddingLeft: 12,
      },
    },
    showDescription: {
      true: {
        display: "flex",
        flexDirection: "column",
      },
    },
  },
});

export const inputObjectName = style({
  color: contract.color.orange[11],
});
