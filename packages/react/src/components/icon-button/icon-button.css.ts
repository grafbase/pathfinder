import { contract, recipe, shared } from "@pathfinder-ide/style";

export const iconButtonClass = recipe({
  base: [
    shared.resets.buttonReset,
    {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0,
      borderRadius: contract.space[4],
      transition: `all .05s ${shared.transitions.authenticMotion}`,
    },
  ],

  variants: {
    isActive: {
      true: {
        backgroundColor: contract.color.neutral[6],
      },
      false: {},
    },
    isDisabled: {
      true: {
        cursor: "not-allowed",
        opacity: 0.65,
      },
    },
    onSurface: {
      1: {
        selectors: {
          "&:hover": {
            backgroundColor: contract.color.neutral[3],
          },
        },
      },
      2: {
        selectors: {
          "&:hover": {
            backgroundColor: contract.color.neutral[5],
          },
        },
      },
      3: {
        selectors: {
          "&:hover": {
            backgroundColor: contract.color.neutral[6],
          },
        },
      },
    },
    size: {
      small: {
        height: contract.space[20],
        width: contract.space[20],
      },
      medium: {
        height: contract.space[24],
        width: contract.space[24],
      },
      large: {
        height: contract.space[28],
        width: contract.space[28],
      },
    },
  },

  compoundVariants: [
    {
      variants: {
        isActive: true,
        onSurface: 1,
      },
      style: {
        backgroundColor: contract.color.neutral[4],
        border: `1px solid ${contract.color.neutral[6]}`,
      },
    },
    {
      variants: {
        isActive: true,
        onSurface: 2,
      },
      style: {
        backgroundColor: contract.color.neutral[5],
        border: `1px solid ${contract.color.neutral[7]}`,
      },
    },
    {
      variants: {
        isActive: true,
        onSurface: 3,
      },
      style: {
        backgroundColor: contract.color.neutral[6],
        border: `1px solid ${contract.color.neutral[8]}`,
      },
    },
  ],
});
