import { style, shared, contract } from "@pathfinder/style";

export const schemaDocumentationClass = style([
  shared.scrollbars,
  {
    color: contract.color.neutral[10],
    height: "100%",
    width: "100%",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    fontSize: 12,
  },
]);

export const breadcrumbClass = style([
  shared.hairlineBorder({
    border: "bottom",
    onSurface: 1,
  }),
  {
    display: "flex",
    alignItems: "center",
    flexGrow: 0,
    flexShrink: 0,
    color: contract.color.neutral[11],
    paddingLeft: 24,
    paddingRight: 24,
    height: 40,
    width: "100%",
  },
]);

export const breadcrumbArrowClass = style({
  display: "flex",
  paddingLeft: 8,
  paddingRight: 8,
});

export const breadcrumbItemClass = style({
  display: "flex",
  gap: 2,
});

export const panesClass = style({
  height: "100%",
  display: "flex",
  overflow: "hidden",
});
