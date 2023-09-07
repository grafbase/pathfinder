import { contract, recipe, shared, style } from "@graphql-pathfinder/style";

export const tabListClass = recipe({
  base: {
    display: "flex",
    flexShrink: 0,
    position: "relative",

    selectors: {
      "&:after": {
        content: "",
        position: "absolute",
        width: "100%",
        height: 1,
        bottom: 1,
        left: 0,
      },
    },
  },

  variants: {
    tabListHeight: {
      32: {
        height: 32,
        selectors: {
          "&:after": {
            bottom: 0,
            backgroundColor: contract.color.neutral[4],
          },
        },
      },
      40: {
        height: 40,
        selectors: {
          "&:after": {
            bottom: 1,
            backgroundColor: contract.color.neutral[3],
          },
        },
      },
    },
  },
});

export const tabButtonClass = recipe({
  base: [
    shared.resets.buttonReset,
    {
      color: contract.color.neutral[9],
      textAlign: "center",
      fontSize: 12,
      position: "relative",
      paddingBottom: 2,
    },
  ],
  variants: {
    variant: {
      BUTTON_LIKE: {
        width: "100%",
        height: 32,
        borderRadius: contract.space[4],

        '&[data-headlessui-state="selected"]': {
          backgroundColor: contract.color.neutral[2],
        },
      },
      INLINE: {
        width: "auto",
        paddingLeft: contract.space[12],
        paddingRight: contract.space[12],
        position: "relative",
        borderLeft: `1px solid transparent`,
        borderRight: `1px solid transparent`,

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
    },
  },
});

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

  selectors: {
    "&::before": {
      content: "",
      zIndex: 2,
      position: "absolute",
      top: 0,
      right: 0,
      width: contract.space[16],
      height: "100%",
    },
  },
});

export const tabPanelsClass = style([
  shared.scrollbars,
  {
    height: "100%",
    overflowY: "auto",
    overflowX: "hidden",
  },
]);
