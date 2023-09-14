import { contract, recipe, shared, style } from "@pathfinder/style";

export const loadingWrapClass = recipe({
  base: {
    position: "fixed",
    zIndex: 2,
    height: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    transition: `all 0.35s ${shared.transitions.authenticMotion}`,
  },
  variants: {
    isVisible: {
      true: { opacity: 1, visibility: "visible" },
      false: { opacity: 0, visibility: "hidden" },
    },
  },
});

export const welcomeClass = style({
  height: "100%",
  width: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  position: "relative",
});

export const welcomeContentClass = recipe({
  base: {
    position: "relative",
    zIndex: 2,
    color: contract.color.neutral[12],
    width: "100%",
    minWidth: 380,
    maxWidth: "45%",
    display: "flex",
    flexDirection: "column",
    gap: 20,
    fontSize: 12,
    transition: `all 0.35s ${shared.transitions.authenticMotion}`,
  },

  variants: {
    isVisible: {
      true: { opacity: 1, visibility: "visible" },
      false: { opacity: 0, visibility: "hidden" },
    },
  },
});

export const welcomeContentControlsClass = style({
  display: "flex",
  justifyContent: "space-between",
  width: "100%",
  borderTop: `1px solid ${contract.color.neutralAlpha[4]}`,
  paddingTop: 16,
});

export const backToPreviousSessionsButton = style([
  shared.resets.buttonReset,
  {
    display: "flex",
    lineHeight: 1.3,
    marginLeft: -8,
    marginBottom: 8,
    alignContent: "center",
    textDecoration: "underline",
  },
]);

export const welcomeContentControlsAddHeadersButtonClass = style([
  shared.resets.buttonReset,
  {
    textDecoration: "underline",
  },
]);

export const welcomeContentControlsDoIntrospectionButtonClass = style([
  shared.resets.buttonReset,
  {
    height: 32,
    display: "flex",
    alignItems: "center",
    gap: 8,
    padding: `0 ${contract.space[12]}`,
    border: `1px solid ${contract.color.neutral[12]}`,
    color: contract.color.neutral[12],
    borderRadius: 4,
    transition: `all .15s ${shared.transitions.authenticMotion}`,

    selectors: {
      "&:hover": {
        backgroundColor: contract.color.neutral[12],
        color: contract.color.neutral[1],
      },

      "&:disabled": {
        cursor: "not-allowed",
        opacity: 0.5,
      },

      "&:disabled&:hover": {
        backgroundColor: "transparent",
        color: contract.color.neutral[12],
      },
    },
  },
]);

export const sessionSelectButtonClass = style([
  shared.resets.buttonReset,
  {
    padding: 12,
    marginBottom: 12,
    width: "100%",
    border: `1px solid ${contract.color.neutralAlpha[5]}`,
    fontFamily: contract.fonts.mono,
    fontSize: 10,
    backgroundColor: contract.color.neutralAlpha[4],
    color: contract.color.neutralAlpha[12],
    borderRadius: 4,
    transition: `all .1s ${shared.transitions.authenticMotion}`,

    selectors: {
      "&:hover": {
        backgroundColor: contract.color.neutralAlpha[8],
        color: contract.color.neutralAlpha[12],
      },
    },
  },
]);

export const startNewSessionButtonWrapClass = style({
  display: "flex",
  width: "100%",
  justifyContent: "end",
  paddingTop: 12,
});

export const startNewSessionButtonClass = style([
  shared.resets.buttonReset,
  {
    height: 32,
    padding: `0 ${contract.space[12]}`,
    marginBottom: 12,
    textAlign: "right",
    width: "fit-content",
    border: `1px solid ${contract.color.neutral[12]}`,
    backgroundColor: "transparent",
    color: contract.color.neutral[12],
    borderRadius: 4,
    transition: `all .1s ${shared.transitions.authenticMotion}`,

    selectors: {
      "&:hover": {
        backgroundColor: contract.color.neutral[12],
        color: contract.color.neutral[1],
      },
    },
  },
]);

export const introspectionStatusWrapClass = style({
  borderTop: `1px solid ${contract.color.neutralAlpha[4]}`,
});

export const introspectionStatusClass = recipe({
  base: {
    borderRadius: 4,
    padding: 12,
    marginTop: 12,
    backgroundColor: contract.color.neutralAlpha[11],
  },
  variants: {
    status: {
      info: {
        border: `1px solid ${contract.color.neutral[10]}`,
      },
      error: {
        border: `1px solid ${contract.color.red[10]}`,
      },
    },
  },
});

export const blueGradientClass = style({
  position: "absolute",
  width: "45%",
  height: "40%",
  zIndex: 1,
  top: "50%",
  left: "65%",
  filter: "blur(100px)",
  borderRadius: "50%",
  transform: "translate3d(0px, 0px, 0px) translate(-50%, -50%)",
  backgroundColor: contract.color.blue[9],
});

export const purpleGradientClass = style({
  position: "absolute",
  width: "45%",
  height: "40%",
  zIndex: 1,
  top: "50%",
  left: "35%",
  filter: "blur(100px)",
  borderRadius: "50%",
  transform: "translate3d(0px, 0px, 0px) translate(-50%, -50%)",
  backgroundColor: contract.color.purple[9],
});
