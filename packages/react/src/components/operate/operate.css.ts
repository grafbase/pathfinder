import { contract, style } from "@pathfinder-ide/style";

export const operateClass = style({
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-end",
  position: "relative",
  paddingRight: contract.space[12],
  paddingLeft: contract.space[12],
});

export const documentEditorWrapClass = style({
  overflowY: "auto",
  height: "100%",
  position: "relative",
  paddingTop: contract.space[12],
  paddingBottom: contract.space[12],
  paddingLeft: contract.space[12],
});

export const separatorClass = style({
  display: "block",
  paddingLeft: contract.space[4],
  paddingRight: contract.space[4],

  selectors: {
    "&:after": {
      content: "",
      display: "block",
      marginTop: 2,
      height: 20,
      width: 1,
      backgroundColor: contract.color.neutral[3],
    },
  },
});
