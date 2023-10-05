import { contract, recipe, shared, style } from "@pathfinder-ide/style";

export const editorTabsClass = style([
  shared.scrollbars,
  shared.hairlineBorder({
    border: "bottom",
    onSurface: 1,
  }),
  {
    width: "100%",
    height: 40,
    display: "flex",
    alignItems: "center",
    flexShrink: 0,
    backgroundColor: contract.color.neutral[2],
    overflowX: "auto",
  },
]);

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
  base: [
    shared.hairlineBorder({ border: "bottom", onSurface: 1 }),
    {
      flexShrink: 0,
      height: "100%",
      position: "relative",
      display: "flex",
      alignItems: "center",
      flexWrap: "nowrap",
      minWidth: 0,
      paddingLeft: 8,
      paddingRight: 8,
      fontSize: 12,
      transition: `opacity .15s ${shared.transitions.authenticMotion}`,

      selectors: {
        "&:hover": {
          color: contract.color.neutral[12],
          opacity: 1,
        },
      },
    },
  ],

  variants: {
    isActive: {
      false: {
        opacity: 0.65,
        color: contract.color.neutral[10],
      },
      true: {
        opacity: 1,
        color: contract.color.neutral[12],
        backgroundColor: contract.color.neutral[1],

        selectors: {
          "&:after": {
            content: "",
            position: "absolute",
            bottom: 0,
            left: 0,
            height: 2,
            width: "100%",
            backgroundColor: contract.color.green[10],
          },
        },
      },
    },
  },
});

export const addTabButtonWrapClass = style({
  marginLeft: contract.space[8],
  marginRight: contract.space[8],
});
