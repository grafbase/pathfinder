import { contract, recipe, shared, style } from '@pathfinder-ide/style';

export const sharedPaneClass = style([
  shared.scrollbars,
  {
    padding: 24,
    height: '100%',
    overflowY: 'auto',
  },
]);

export const returnTypeButtonClass = style([
  shared.resets.buttonReset,
  {
    color: contract.color.blue[11],
    selectors: {
      '&:hover': {
        textDecoration: `underline`,
      },
    },
  },
]);

export const scalarArgumentNameClass = style({
  color: contract.color.red[11],
});

export const notificationClass = style({
  padding: 12,
  color: contract.color.orange[12],
  borderRadius: 2,
  border: `1px solid ${contract.color.orange[5]}`,
  backgroundColor: contract.color.orange[1],
});

export const tertiaryTriggerButtonClass = recipe({
  base: [
    shared.resets.buttonReset,
    {
      color: contract.color.blue[11],

      selectors: {
        '&:hover': {
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
