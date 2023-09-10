import { contract, recipe, style } from "@pathfinder/style";

export const argumentsClass = recipe({
  base: {
    position: "relative",
  },

  variants: {
    isExpanded: {
      true: {
        marginBottom: contract.space[8],
      },
      false: {},
    },
  },
});

export const argumentsLeadWrapClass = style({
  width: "100%",
  display: "flex",
  alignItems: "center",
  gap: contract.space[8],
  fontSize: 10,
  fontWeight: 500,
  color: contract.color.neutral[4],
});

export const argumentsContentClass = style({
  width: "100%",
  paddingLeft: contract.space[20],
  marginTop: contract.space[4],
  marginLeft: contract.space[4],
  position: "relative",

  selectors: {
    "&::after": {
      content: "",
      position: "absolute",
      top: 0,
      left: 7,
      height: `100%`,
      width: 1,
      borderLeft: `1px solid ${contract.color.neutral[2]}`,
    },
  },
});

export const argumentsListClass = style({
  all: "unset",
  margin: 0,
  overflow: "hidden",
  display: "flex",
  flexDirection: "column",
  position: "relative",
});
