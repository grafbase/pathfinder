import { contract, recipe, shared, style } from "@pathfinder-ide/style";

export const sharedPaneClass = style([
  shared.scrollbars,
  {
    padding: 24,
    height: "100%",
    overflowY: "auto",
  },
]);

export const returnTypeButtonClass = style([
  shared.resets.buttonReset,
  {
    color: contract.color.blue[11],
    selectors: {
      "&:hover": {
        textDecoration: `underline`,
      },
    },
  },
]);

export const scalarArgumentNameClass = style({
  color: contract.color.purple[11],
});

export const tertiaryTriggerButtonClass = recipe({
  base: [
    shared.resets.buttonReset,
    {
      color: contract.color.blue[11],

      selectors: {
        "&:hover": {
          textDecoration: `underline`,
        },
      },
    },
  ],

  variants: {
    color: {
      BLUE: {
        color: contract.color.blue[11],
      },
      GREEN: {
        color: contract.color.green[11],
      },
      VIOLET: {
        color: contract.color.purple[11],
      },
    },
  },
});
