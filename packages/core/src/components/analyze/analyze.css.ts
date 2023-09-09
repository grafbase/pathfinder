import { contract, recipe, shared, style } from "@pathfinder/style";

export const analyzeClass = style({
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-end",
  position: "relative",
});

export const responseEditorClass = recipe({
  base: {
    transition: `opacity .10s ${shared.transitions.authenticMotion}`,
  },

  variants: {
    hideResponseEditor: {
      true: {
        visibility: "hidden",
        opacity: 0,
        height: 0,
        padding: 0,
      },
      false: {
        visibility: "visible",
        opacity: 1,
        overflowY: "auto",
        height: "100%",
        position: "relative",
        paddingTop: contract.space[16],
        paddingRight: contract.space[4],
        paddingBottom: contract.space[16],
      },
    },
    isExecuting: {
      true: { opacity: "0.25 !important" },
      false: { opacity: "1 !important" },
    },
  },
});

export const responseNullStateClass = style({
  height: "100%",
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: contract.space[16],
  color: contract.color.neutral[6],
  fontSize: contract.space[12],
  cursor: "default",
});
