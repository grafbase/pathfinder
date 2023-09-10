import { contract, recipe, shared, style } from "@pathfinder/style";

export const editorTabsClass = style({
  width: "100%",
  height: 40,
  display: "flex",
  alignItems: "center",
  borderBottom: contract.color.neutral[3],
  minWidth: 0,
  backgroundColor: contract.color.neutral[2],
});

export const tabButtonClass = recipe({
  base: [
    shared.resets.buttonReset,
    {
      height: "inherit",

      display: "flex",
      alignItems: "center",
      gap: 8,
      paddingLeft: 3,
      paddingRight: 3,
    },
  ],

  variants: {
    hasRemoveTabButton: {
      true: {
        paddingRight: contract.space[8],
      },
    },
  },
});

export const tabWrapClass = recipe({
  base: {
    height: "100%",
    position: "relative",
    display: "flex",
    alignItems: "center",
    flexWrap: "nowrap",
    minWidth: 0,
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 2,
    fontSize: 12,
    transition: `opacity .15s ${shared.transitions.authenticMotion}`,
    borderBottom: `2px solid transparent`,

    selectors: {
      "&:hover": {
        // backgroundColor: contract.color.neutral[2],
        color: contract.color.neutral[12],
        opacity: 1,

        // borderBottom: `2px solid ${contract.color.neutral[3]}`,
      },
    },
  },

  variants: {
    isActive: {
      false: {
        opacity: 0.65,
        color: contract.color.neutral[10],
        // "&:hover": {
        //   height: `calc(100% - 1px)`,
        //   [`& ${StyledRemoveTabButtonWrap}`]: {
        //     marginTop: `calc(-1 * var(--hairline-width))`,
        //   },
        // },
      },
      true: {
        flexShrink: 0,
        opacity: 1,
        borderBottom: `2px solid ${contract.color.green[10]}`,
        color: contract.color.neutral[12],
        backgroundColor: contract.color.neutral[1],

        selectors: {
          "&:hover": {
            backgroundColor: "transparent",
          },
        },

        // flexShrink: 0,
        // [`& ${StyledTabButton}`]: {
        //   color: contract.color.neutral[12],
        // },
        // "&:after": {
        //   content: "",
        //   position: "absolute",
        //   bottom: 0,
        //   left: 0,
        //   height: 2,
        //   width: "100%",
        //   backgroundColor:contract.color.green[10],,
        // },
      },
    },
  },
});

export const addTabButtonWrapClass = style({
  marginLeft: contract.space[2],
  marginRight: contract.space[2],
});
