import { contract, recipe, shared, style } from "@pathfinder/style";

export const quickDocsClass = recipe({
  base: {
    backgroundColor: contract.color.neutral[2],
    paddingTop: contract.space[8],
    paddingBottom: contract.space[16],
    borderRadius: contract.space[4],
    position: "absolute",
    top: contract.space[8],
    left: contract.space[8],
    overflowY: "auto",
    height: `calc(100% - ${contract.space[16]})`,
    width: `calc(100% - ${contract.space[16]})`,
    transition: `all .15s ${shared.transitions.authenticMotion}`,
  },

  variants: {
    dialogActive: {
      true: {
        visibility: "visible",
        opacity: "1",
        transform: "scale(1)",
      },
      false: {
        visibility: "hidden",
        opacity: "0",
        transform: "scale(0.96)",
      },
    },
  },
});

export const quickDocsPortalContainerClass = style({
  position: "relative",
  height: "100%",
  width: "100%",
});

export const quickDocsDialogRootClass = style({
  position: "relative",
  height: "100%",
  width: "100%",
});

export const quickDocsDialogContentClass = style({
  position: "absolute",
  top: 0,
  left: 0,
  height: "100%",
  width: "100%",
});
