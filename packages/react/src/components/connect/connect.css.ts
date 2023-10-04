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

export const loadStoredSessionCopyClass = style({
  padding: 0,
  margin: 0,
  paddingBottom: 16,
});

export const connectClass = style({
  height: "100%",
  width: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  position: "relative",
});

export const connectContentClass = recipe({
  base: {
    position: "relative",
    zIndex: 2,
    color: contract.color.neutral[12],
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: 16,
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

export const connectContentHeadersClass = recipe({
  base: [
    shared.scrollbars,
    {
      display: "flex",
      flexDirection: "column",
      gap: 16,
      transition: "all .15s ease-in-out",
      overflowY: "auto",
    },
  ],

  variants: {
    isVisible: {
      true: {
        maxHeight: 220,
      },
      false: {
        maxHeight: 0,
        marginBottom: -16,
      },
    },
  },
});

export const connectContentHeaderRowClass = style({
  display: "grid",
  gridTemplateColumns: `180px 1fr`,
  gap: 12,

  selectors: {
    "&:nth-of-type(1)": {
      marginTop: 8,
    },
  },
});

export const connectContentAddHeaderButtonClass = style([
  shared.resets.buttonReset,
  {
    height: 32,
    width: "fit-content",
    color: contract.color.neutral[11],

    selectors: {
      "&:hover": {
        color: contract.color.neutral[12],
      },
    },
  },
]);

export const connectContentControlsClass = style({
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
    // textDecoration: "underline",
    color: contract.color.neutral[11],

    selectors: {
      "&:hover": {
        color: contract.color.neutral[12],
      },
    },
  },
]);

export const connectContentControlsAddHeadersButtonClass = style([
  shared.resets.buttonReset,
  {
    color: contract.color.neutral[11],
    textDecoration: "underline",
  },
]);

export const connectContentControlsDoIntrospectionButtonClass = style([
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

export const startNewSessionButtonWrapClass = style({
  display: "flex",
  width: "100%",
  justifyContent: "flex-end",
  paddingTop: 12,
});

export const introspectionStatusClass = recipe({
  base: {
    borderRadius: 4,
    padding: 12,
    marginTop: 12,
    backgroundColor: contract.color.neutral[2],
  },
  variants: {
    isAttemptingIntrospection: {
      true: {},
      false: {},
    },
    status: {
      info: {
        border: `1px dotted ${contract.color.neutral[11]}`,
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
