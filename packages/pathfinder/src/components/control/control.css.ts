import { contract, recipe, style } from "@graphql-pathfinder/style";

export const labelClass = recipe({
  base: {
    width: "auto",
    whiteSpace: "nowrap",
    display: "flex",
    alignItems: "center",
    gap: contract.space[8],
    padding: `0 ${contract.space[8]}`,
    border: `1px solid ${contract.color.neutral[4]}`,
    backgroundColor: contract.color.neutral[2],
    color: contract.color.neutral[8],
    fontSize: 12,
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

export const inputClass = recipe({
  base: {
    all: "unset",
    boxSizing: "border-box",
    width: "100%",
    height: 32,
    paddingLeft: 8,
    borderRadius: 2,
    fontFamily: contract.fonts.mono,
    fontSize: 11,
    lineHeight: 1,
    color: contract.color.neutral[12],

    selectors: {
      "&:focus": {
        backgroundColor: contract.color.neutral[4],
      },

      "&::placeholder": {
        color: contract.color.neutral[7],
      },
    },
  },

  variants: {
    displayLabel: {
      false: {
        border: `1px solid ${contract.color.neutral[7]}`,

        selectors: {
          "&:focus": {
            border: `1px solid ${contract.color.neutral[8]}`,
          },
        },
      },
      true: {
        borderTop: `1px solid ${contract.color.neutral[7]}`,
        borderRight: `1px solid ${contract.color.neutral[7]}`,
        borderBottom: `1px solid ${contract.color.neutral[7]}`,

        selectors: {
          "&:focus": {
            borderTop: `1px solid ${contract.color.neutral[8]}`,
            borderRight: `1px solid ${contract.color.neutral[8]}`,
            borderBottom: `1px solid ${contract.color.neutral[8]}`,
          },
        },
      },
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

export const controlClass = style({
  display: "flex",
  width: "100%",
});
