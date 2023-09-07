import { contract, style } from "@graphql-pathfinder/style";

import { recipe } from "@vanilla-extract/recipes";

export const resizerClass = recipe({
  base: {
    display: "grid",
    height: "100%",
    width: "100%",
    position: "relative",
    overflow: "hidden",
  },

  variants: {
    isInitialized: {
      true: {
        opacity: 1,
        visibility: "visible",
      },
      false: {
        opacity: 0,
        visibility: "hidden",
      },
    },
  },
});

export const paneClass = style({
  overflow: "hidden",
});

export const handleClass = recipe({
  base: {
    position: "relative",
    zIndex: 2,
    backgroundColor: "transparent",

    selectors: {
      // this pseudo element is the 1px line between panes
      "&::before": {
        content: "",
        position: "absolute",
        zIndex: 1,
        left: "50%",
        top: "50%",
        transform: "translate3d(-50%, -50%, 0)",
        backgroundColor: contract.color.neutral[3],
      },

      // this pseudo element is a small handle meant to appear on hover
      "&::after": {
        content: "",
        position: "absolute",
        zIndex: 1,
        left: "50%",
        top: "50%",
        transform: "translate3d(-50%, -50%, 0)",
        borderRadius: 8,
        transition: "background-color .15s ease",
        backgroundColor: "transparent",
      },

      // this wonky bit of chained selector magic is the state of our small handle when we hover anywhere over the larger handle area
      "&:hover::after": {
        backgroundColor: contract.color.neutral[6],
      },
    },
  },

  variants: {
    orientation: {
      VERTICAL: {
        width: "100%",
        height: 12,
        top: "-6px",
        cursor: "row-resize",

        selectors: {
          "&::before": {
            height: 1,
            width: "100%",
          },

          "&::after": {
            height: 4,
            width: 110,
          },
        },
      },
      HORIZONTAL: {
        height: "100%",
        width: 12,
        left: "-6px",
        cursor: "col-resize",

        selectors: {
          "&::before": {
            height: "100%",
            width: 1,
          },

          "&::after": {
            width: 4,
            height: 110,
          },
        },
      },
    },
  },
});
