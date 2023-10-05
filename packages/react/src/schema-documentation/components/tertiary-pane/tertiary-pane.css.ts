import { contract, shared, style } from "@pathfinder-ide/style";
import { sharedPaneClass } from "../../shared.styles.css";

export const tertiaryPaneContentClass = style([
  shared.scrollbars,
  {
    height: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: 16,
    paddingTop: 24,
    overflow: "auto",
  },
]);

export const tertiaryPaneLeadInfoSpanClass = style({
  selectors: {
    "&:nth-of-type(1)": {
      textTransform: "uppercase",
      lineHeight: 1,
      fontSize: 10,
      letterSpacing: 0.5,
      color: contract.color.neutral[9],
      whiteSpace: "nowrap",
    },
    "&:nth-of-type(2)": {
      color: contract.color.neutral[12],
      fontWeight: 500,
      maxWidth: "100%",
      overflow: "hidden",
      whiteSpace: "nowrap",
      textOverflow: "ellipsis",
    },
  },
});

export const tertiaryPaneLeadInfoClass = style({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  gap: 12,
  paddingTop: 2,
});

export const tertiaryPaneLeadClass = style([
  shared.hairlineBorder({
    border: "bottom",
    onSurface: 1,
  }),
  {
    display: "flex",
    alignItems: "center",
    paddingBottom: 12,
  },
]);

export const tertiaryPaneClass = style([
  sharedPaneClass,
  {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    height: "100%",
    overflow: "hidden",
    paddingTop: 24,
    fontSize: 12,
  },
]);

export const tertiaryPaneNavButtonWrapClass = style({
  transform: `rotate(90deg)`,
  flexShrink: 0,
});
