import { contract, recipe, shared } from "@graphql-pathfinder/style";

export const buttonClass = recipe({
  base: [
    shared.resets.buttonReset,
    {
      userSelect: "none",
      display: "flex",
      alignItems: "center",
      gap: contract.space[4],
      borderRadius: contract.space[2],
      fontSize: 12,
      fontWeight: 400,
      transition: `all .075s ${shared.transitions.authenticMotion}`,
      color: contract.color.neutral[11],

      selectors: {
        "&:hover": {
          color: contract.color.neutral[12],
        },
      },
    },
  ],

  variants: {
    isDisabled: {
      true: {
        cursor: "not-allowed",
        opacity: 0.35,
        backgroundColor: contract.color.neutral[3],
        border: `1px solid ${contract.color.neutral[3]}`,
      },
    },
    onSurface: {
      1: {
        backgroundColor: contract.color.neutral[1],
        selectors: {
          "&:hover": {
            backgroundColor: contract.color.neutral[4],
          },
        },
      },
      2: {
        backgroundColor: contract.color.neutral[2],
        selectors: {
          "&:hover": {
            backgroundColor: contract.color.neutral[5],
          },
        },
      },
      3: {
        backgroundColor: contract.color.neutral[3],
        selectors: {
          "&:hover": {
            backgroundColor: contract.color.neutral[6],
          },
        },
      },
    },
    size: {
      small: {
        height: contract.space[24],
      },
      medium: {
        height: contract.space[28],
      },
      large: {
        height: 40,
      },
    },
    width: {
      "100%": {
        width: "100%",
      },
      "fit-content": {
        width: "fit-content",
      },
    },
    withBorder: {
      false: {},
      true: {},
    },
    withIcon: {
      false: {
        paddingRight: contract.space[8],
        paddingLeft: contract.space[8],
      },
      true: {
        paddingRight: contract.space[8],
        paddingLeft: contract.space[4],
      },
    },
  },

  compoundVariants: [
    {
      variants: {
        onSurface: 1,
        withBorder: true,
      },
      style: {
        border: `1px solid ${contract.color.neutral[6]}`,
      },
    },
    {
      variants: {
        onSurface: 2,
        withBorder: true,
      },
      style: {
        border: `1px solid ${contract.color.neutral[7]}`,
      },
    },
    {
      variants: {
        onSurface: 3,
        withBorder: true,
      },
      style: {
        border: `1px solid ${contract.color.neutral[8]}`,
      },
    },
  ],
});
