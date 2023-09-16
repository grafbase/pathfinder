import { contract, style } from "@pathfinder/style";

export const sectionClass = style({
  display: "flex",
  flexDirection: "column",
  marginBottom: 24,
  color: contract.color.neutral[12],
});

export const sectionLeadClass = style({
  display: "flex",
  textTransform: "uppercase",
  lineHeight: 1,
  fontSize: 10,
  letterSpacing: 0.5,
  marginBottom: 12,
  color: contract.color.neutral[9],
});

export const enumValueClass = style({
  color: contract.color.green[10],
  marginBottom: 8,
});
