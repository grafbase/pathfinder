import { contract, recipe, style } from "@pathfinder/style";

export const listItemClass = recipe({
  base: {
    all: "unset",
    width: "100%",
    position: "relative",
  },

  variants: {
    hasParent: {
      true: {
        selectors: {
          "&::before": {
            content: "",
            position: "absolute",
            top: 10,
            left: -10,
            height: 1,
            width: 12,
            backgroundColor: contract.color.neutral[4],
          },
          "&:last-of-type&::after": {
            content: "",
            position: "absolute",
            zIndex: 1,
            top: 11,
            left: -11,
            height: "100%",
            width: 1,
            backgroundColor: contract.color.neutral[1],
          },
        },
      },
      false: {},
    },
    isCollapsible: {
      true: {},
      false: {},
    },
  },
});

export const listItemLeadClass = recipe({
  base: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    gap: 2,
  },

  variants: {
    isCollapsible: {
      true: {
        display: "flex",
        width: "100%",
      },
      false: {
        display: "grid",
        gridTemplateColumns: `${contract.space[20]} 1fr`,
      },
    },
  },
});

export const listItemContentClass = recipe({
  base: {
    position: "relative",
    paddingLeft: contract.space[16],
    marginTop: contract.space[4],
    marginLeft: contract.space[4],

    selectors: {
      "&::after": {
        content: "",
        position: "absolute",
        top: -6,
        left: 5,
        height: "calc(100% - 3px)",
        width: 1,
        backgroundColor: contract.color.neutral[4],
      },
    },
  },
  variants: {
    isExpanded: {
      true: {
        marginBottom: 8,
      },
      false: {
        display: "none",
      },
    },
  },
});

export const listItemChildFieldsClass = style({
  all: "unset",
  padding: 0,
  margin: 0,
  display: "flex",
  flexDirection: "column",
  gap: 2,
});
