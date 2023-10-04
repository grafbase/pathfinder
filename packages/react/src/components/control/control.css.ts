import { contract, recipe, style } from "@pathfinder/style";

export const controlClass = style({
  display: "flex",
  flexDirection: "column",
  gap: 6,
  width: "100%",
});

export const labelClass = recipe({
  base: {
    width: "auto",
    whiteSpace: "nowrap",
    color: contract.color.neutral[12],
    fontSize: 12,
    lineHeight: 1,
  },

  variants: {
    displayLabel: {
      false: {
        position: "absolute",
        top: "-9999px !important",
        left: "-9999px !important",
      },
    },
  },
});

export const inputClass = style({
  all: "unset",
  boxSizing: "border-box",
  width: "100%",
  height: 32,
  paddingLeft: 8,
  borderRadius: 2,
  fontFamily: contract.fonts.mono,
  fontSize: 11,
  lineHeight: 1,
  color: contract.color.neutral[11],
  backgroundColor: contract.color.neutral[3],
  border: `1px solid ${contract.color.neutral[4]}`,

  selectors: {
    "&:focus": {
      color: contract.color.neutral[12],
      backgroundColor: contract.color.neutral[5],
      border: `1px solid ${contract.color.neutral[6]}`,
    },

    "&::placeholder": {
      color: contract.color.neutral[8],
    },
  },
});

export const selectWrapClass = style({
  width: "100%",
  position: "relative",
  cursor: "pointer",
  color: contract.color.yellow[10],
  borderTop: `1px solid ${contract.color.neutral[4]}`,
  borderRight: `1px solid ${contract.color.neutral[4]}`,
  borderBottom: `1px solid ${contract.color.neutral[4]}`,

  selectors: {
    "&:focus": {
      backgroundColor: contract.color.neutral[2],
    },
  },
});

export const selectClass = style({
  all: "unset",
  boxSizing: "border-box",
  display: "flex",
  alignItems: "center",
  width: "100%",
  height: 28,
  color: contract.color.yellow[10],
});

export const selectDecorationClass = style({
  position: `absolute`,
  right: 12,
  top: 9,
  height: 10,
  width: 10,
});

export const col = style({
  display: `flex`,
  flexDirection: `column`,
  gap: 24,
  // backgroundColor: contract.color.neutral[1],
});

export const row = style({
  display: `grid`,
  gridTemplateColumns: `160px 1fr`,
  gap: 24,
});

export const info = style({
  display: `flex`,
  flexDirection: `column`,
  alignItems: `center`,
  color: contract.color.neutral[8],

  // span: {
  //   fontSize: 10,
  // },
});

export const dataClass = style({
  display: `flex`,
  alignItems: `center`,
  color: contract.color.neutral[12],
});
