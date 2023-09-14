import { contract, recipe, shared, style } from "@pathfinder/style";

export const tabListClass = recipe({
  base: {
    display: "flex",
    flexShrink: 0,
    position: "relative",
  },

  variants: {
    tabListHeight: {
      32: {
        height: 32,
      },
      40: {
        height: 40,
      },
    },
  },
});

export const tabButtonClass = style([
  shared.resets.buttonReset,
  {
    width: "auto",
    position: "relative",
    paddingBottom: 2,
    paddingLeft: contract.space[12],
    paddingRight: contract.space[12],
    textAlign: "center",
    fontSize: 12,
    color: contract.color.neutral[9],

    selectors: {
      "&:hover": {
        color: contract.color.neutral[12],
      },

      "&:after": {
        content: "",
        position: "absolute",
        width: `calc(100% - ${contract.space[24]})`,
        height: 2,
        bottom: 1,
        left: contract.space[12],
        zIndex: 1,
      },

      '&[data-headlessui-state="selected"]': {
        color: contract.color.neutral[12],
      },

      '&[data-headlessui-state="selected"]&:after': {
        backgroundColor: contract.color.green[10],
      },
    },
  },
]);

export const tabGroupClass = style({
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
});

export const tabPanelClass = style({
  color: contract.color.neutral[7],
  position: "relative",
  height: "100%",
});

export const tabPanelsClass = style([
  shared.scrollbars,
  {
    height: "100%",
    overflowY: "auto",
    overflowX: "hidden",
  },
]);
