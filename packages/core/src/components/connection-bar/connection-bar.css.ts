import { contract, shared, style } from "@pathfinder/style";

export const connectionBarClass = style([
  shared.hairlineBorder({
    border: "bottom",
    onSurface: 1,
  }),
  {
    display: "flex",
    justifyContent: "center",
    paddingTop: 8,
    paddingBottom: 8,
    backgroundColor: contract.color.neutral[1],
  },
]);

export const connectionBarDialogClass = style([
  shared.hairlineBorder({
    border: "bottom",
    onSurface: 1,
  }),
  {
    position: "fixed",
    zIndex: 4,
    backgroundColor: contract.color.neutral[2],
    border: `1px solid ${contract.color.neutral[4]}`,
    padding: 24,
    borderRadius: 8,
    top: "50%",
    left: "50%",
    transform: "translate3d(-50%, -50%, 0)",
    maxWidth: "50%",
    width: "100%",
  },
]);

export const connectionBarDialogBackdropClass = style({
  position: "fixed",
  zIndex: 3,
  backgroundColor: contract.color.neutralAlpha[1],
  top: 0,
  left: 0,
  height: "100%",
  width: "100%",
  backdropFilter: "blur(3px)",
});

export const connectionBarContentClass = style([
  shared.hairlineBorder({
    border: "all",
    onSurface: 1,
  }),
  {
    cursor: "default",
    display: "flex",
    alignContent: "center",
    alignItems: "center",
    gap: 12,
    borderRadius: 2,
    fontSize: 12,
    paddingLeft: 16,
    backgroundColor: contract.color.neutral[2],
    color: contract.color.neutral[10],
  },
]);

export const connectionBarContentIconClass = style([
  {
    height: "100%",
    width: 32,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
]);
