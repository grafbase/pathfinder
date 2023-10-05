import { contract, recipe, shared } from "@pathfinder-ide/style";

export const typeSystemNavButtonClass = recipe({
  base: [
    shared.resets.buttonReset,
    {
      position: "relative",
      display: "flex",
      alignItems: "center",
      gap: 12,
      width: "calc(100% + 48px)",
      marginLeft: -24,
      height: 40,
      paddingLeft: 24,
      paddingRight: 24,
      color: contract.color.neutral[11],

      selectors: {
        "&:hover": {
          color: contract.color.neutral[12],
          backgroundColor: contract.color.neutralAlpha[2],
        },

        "&:after": {
          content: "",
          position: "absolute",
          width: 2,
          height: "100%",
          top: 0,
          right: 0,
          backgroundColor: "transparent",
        },
      },
    },
  ],

  variants: {
    isActive: {
      true: {
        backgroundColor: contract.color.neutralAlpha[3],
        color: contract.color.neutral[12],

        selectors: {
          "&:hover": {
            backgroundColor: contract.color.neutralAlpha[3],
            color: contract.color.neutral[12],
          },
          "&:after": {
            backgroundColor: contract.color.green[10],
          },
        },
      },
    },
  },
});
