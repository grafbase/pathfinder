import { contract, globalStyle, style } from "@pathfinder-ide/style";

export const markdownClass = style({
  display: "flex",
  flexDirection: "column",
  paddingTop: 4,
  paddingBottom: 4,
  color: contract.color.neutral[12],
});

const sharedMarkdownStyles = {
  fontSize: 14,
  lineHeight: 1.5,
  color: contract.color.neutral[12],
  marginTop: 0,
  marginBottom: 12,
};

globalStyle(`${markdownClass} > :first-child`, {
  marginTop: 0,
});

globalStyle(`${markdownClass} > :last-child`, {
  marginBottom: 0,
});

globalStyle(`${markdownClass} blockquote`, {
  marginLeft: 0,
  marginRight: 0,
  paddingLeft: 8,
  borderLeft: `2px solid ${contract.color.neutral[7]}`,
});

globalStyle(`${markdownClass} code`, {
  borderRadius: 2,
  backgroundColor: contract.color.neutral[4],
  padding: 2,
});

globalStyle(`${markdownClass} pre`, {
  overflow: "auto",
  padding: 8,
  borderRadius: 4,
  backgroundColor: contract.color.neutral[4],
  ...sharedMarkdownStyles,
});

globalStyle(`${markdownClass} ol`, {
  listStyleType: "decimal",
  paddingLeft: 16,
  ...sharedMarkdownStyles,
});

globalStyle(`${markdownClass} p`, {
  ...sharedMarkdownStyles,
});

globalStyle(`${markdownClass} blockquote`, {
  ...sharedMarkdownStyles,
});

globalStyle(`${markdownClass} dl`, {
  ...sharedMarkdownStyles,
});

globalStyle(`${markdownClass} table`, {
  ...sharedMarkdownStyles,
});

globalStyle(`${markdownClass} details`, {
  ...sharedMarkdownStyles,
});

globalStyle(`${markdownClass} ul`, {
  listStyleType: "disc",
  paddingLeft: 16,
  ...sharedMarkdownStyles,
});

globalStyle(`${markdownClass} a`, {
  color: contract.color.blue[12],
});

globalStyle(`${markdownClass} hr`, {
  all: "unset",
  borderTop: `1px solid ${contract.color.neutral[8]}`,
});

globalStyle(`${markdownClass} img`, {
  maxHeight: 120,
  maxWidth: 100,
});
