import { contract, recipe, shared, style } from "@pathfinder/style";

export const ideWrapClass = recipe({
  base: {
    display: "grid",
    height: "100%",
    overflow: "hidden",
  },

  variants: {
    withSchemaProps: {
      true: {},
      false: {
        gridTemplateRows: "48px 1fr",
      },
    },
  },
});

export const ideClass = style({
  display: "grid",
  gridTemplateColumns: "60px 1fr",
  height: "100%",
  overflow: "hidden",
});

export const navigationWrapClass = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "space-between",
  paddingBottom: 12,
});

export const navigationClass = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  color: contract.color.neutral[12],
  overflow: "hidden",
  gap: 12,
  paddingTop: 12,
  paddingBottom: 12,
});

export const navigationButtonClass = recipe({
  base: [
    shared.resets.buttonReset,
    {
      height: 40,
      width: 40,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      border: `1px solid ${contract.color.neutral[7]}`,
      backgroundColor: contract.color.neutral[4],
      borderRadius: 4,
      transition: `all .15s ${shared.transitions.authenticMotion}`,

      selectors: {
        "&:hover": {
          opacity: 1,
        },
      },
    },
  ],
  variants: {
    isActive: {
      true: {
        opacity: 1,
      },
      false: {
        opacity: 0.35,
      },
    },
  },
});

export const panesWrapClass = style({
  height: "100%",
  width: "100%",
  overflow: "hidden",
});

export const paneClass = recipe({
  base: {},
  variants: {
    isVisible: {
      true: {
        visibility: "visible",
        opacity: 1,
        height: "100%",
        width: "100%",
      },
      false: {
        visibility: "hidden",
        opacity: 0,
        height: 0,
        width: 0,
      },
    },
  },
});
