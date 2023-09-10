import { contract, recipe, shared, style } from "@pathfinder/style";

export const detailsTogglerClass = recipe({
  base: [
    shared.resets.buttonReset,
    {
      whiteSpace: "nowrap",
      display: "flex",
      transition: `all .1s ${shared.transitions.authenticMotion}`,

      selectors: {
        "&:hover": {
          color: contract.color.neutral[7],
        },

        "&:disabled": {
          cursor: "not-allowed",
          color: contract.color.neutral[7],
        },

        "&:disabled&:hover": {
          color: contract.color.neutral[7],
        },
      },
    },
  ],

  variants: {
    variant: {
      ARGUMENT: {
        fontSize: 12,
      },
      FIELD: {},
      INLINE_FRAGMENT: {},
      INPUT_OBJECT: {},
    },
    isSelected: {
      true: {
        color: contract.color.neutral[7],
        fontWeight: 600,
        "&:hover": {
          color: contract.color.neutral[7],
        },
      },
      false: {
        fontWeight: 400,
        color: contract.color.neutral[5],
      },
    },
  },
});

export const detailsClass = style({
  display: "flex",
  gap: 6,
  fontSize: 14,
  marginLeft: contract.space[8],
  width: `100%`,
});

export const detailsNameAndControlsClass = style({
  display: "flex",
  alignItems: "center",
  gap: contract.space[4],
  borderBottom: "1px solid transparent",
  fontSize: 14,
  width: `100%`,
});

export const inlineFragmentClass = recipe({
  variants: {
    isSelected: {
      true: {
        color: contract.color.neutral[7],
        fontWeight: 600,
      },
      false: {
        fontWeight: 400,
        color: contract.color.neutral[5],
      },
    },
  },
});
