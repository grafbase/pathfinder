import { contract, style } from "@graphql-pathfinder/style";

export const variablesClass = style({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  height: "100%",
});

export const variablesEditorWrapClass = style({
  paddingTop: contract.space[16],
  paddingRight: contract.space[16],
  height: "100%",
});
