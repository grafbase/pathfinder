import { contract, shared, style } from "@graphql-pathfinder/style";

export const historyClass = style({
  display: "flex",
  flexDirection: "column",
  height: "100%",
  width: "100%",
  color: contract.color.neutral[5],
});

export const historyListClass = style([
  shared.scrollbars,
  {
    all: "unset",
    overflowX: "hidden",
    overflowY: "auto",
    height: "100%",
    margin: 0,
    padding: 0,
    display: "flex",
    flexDirection: "column",
    backgroundColor: contract.color.neutral[2],
  },
]);

export const historyListHeaderClass = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  height: 32,
  padding: `0 ${contract.space[16]}`,
  fontSize: 11,
  color: contract.color.neutral[12],
  borderBottom: `1px solid ${contract.color.neutral[5]}`,
});

export const historyNullStateClass = style({
  padding: contract.space[24],
});
