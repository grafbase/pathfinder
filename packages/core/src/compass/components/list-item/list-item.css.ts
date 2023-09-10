import { contract, recipe, style } from "@pathfinder/style";

export const listItemContentClass = recipe({
  base: {
    position: `relative`,
    paddingLeft: contract.space[20],
    marginTop: contract.space[4],
    marginLeft: contract.space[8],

    selectors: {
      "&::after": {
        content: "",
        position: `absolute`,
        top: 0,
        left: 3,
        height: `100%`,
        width: 1,
        backgroundColor: contract.color.red[10],
      },
    },
  },
  variants: {
    isExpanded: {
      true: {},
      false: {
        display: `none`,
      },
    },
  },
});

export const listItemLeadClass = recipe({
  base: {
    width: `100%`,
    alignItems: "center",
  },

  variants: {
    isCollapsible: {
      true: {
        display: `flex`,
        width: `100%`,
      },
      false: {
        display: "grid",
        height: contract.space[28],
        gridTemplateColumns: `${contract.space[24]} 1fr`,
      },
    },
  },
});

export const listItemClass = style({
  all: "unset",
  width: `100%`,

  // "& .child-fields": {
  //   all: `unset`,
  //   padding: 0,
  //   margin: 0,
  //   display: "flex",
  //   flexDirection: "column",
  //   gap: 2,
  // },
});
