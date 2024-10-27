import { contract, recipe, shared, style } from '@pathfinder-ide/style';

export const sharedPaneClass = style([
  shared.scrollbars,
  {
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

export const paneItemStyles = {
  container: recipe({
    base: [
      shared.resets.buttonReset,
      {
        color: contract.color.blue[11],
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 12,

        width: '100%',
        minHeight: 28,
        paddingLeft: 12,
        paddingRight: 12,
        paddingTop: 8,
        paddingBottom: 8,

        selectors: {
          '&:hover': {
            backgroundColor: contract.color.neutral[2],
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
        NEUTRAL: {
          color: contract.color.neutral[12],
        },
      },
    },
  }),

  layout: style({
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
  }),

  description: style({
    opacity: 0.8,
  }),

  icon: style({
    transform: 'rotate(-90deg)',
  }),
};
