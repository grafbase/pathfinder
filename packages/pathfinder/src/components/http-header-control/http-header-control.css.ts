import { contract, recipe, shared, style } from "@graphql-pathfinder/style";

const grid = {
  display: "grid",
  alignItems: "center",
  justifyContent: "center",
  gap: contract.space[12],
  gridTemplateColumns: `48px 0.4fr 0.6fr ${contract.space[24]}`,
};

export const headerControlWrapClass = style({
  display: "flex",
  flexDirection: "column",
  gap: contract.space[12],
  padding: contract.space[16],
  paddingLeft: 0,
});

export const headerControlHeaderSpanClass = style({
  color: contract.color.neutral[10],
  fontSize: 10,
  textTransform: `uppercase`,
  letterSpacing: 0.5,
});

export const headerControlHeaderClass = style({
  ...grid,
  borderBottom: `1px solid ${contract.color.neutral[4]}`,
  paddingBottom: contract.space[4],
});

export const headerControlClass = style({
  ...grid,
});

export const headerControlsClass = style({
  display: `flex`,
  flexDirection: `column`,
  gap: contract.space[8],
});

export const addHeaderButtonWrapClass = style({
  marginTop: contract.space[12],
});
