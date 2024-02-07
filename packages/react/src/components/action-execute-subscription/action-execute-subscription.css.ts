import { contract, recipe, style } from '@pathfinder-ide/style';

export const actionExecuteSubscriptionStyle = {
  container: recipe({
    base: {
      all: 'unset',
      width: '100%',
      height: 32,
      display: 'flex',
      alignItems: 'center',
      gap: 4,
      paddingLeft: 4,
      paddingRight: 8,
      backgroundColor: 'transparent',
      borderRadius: 2,
      border: `1px solid ${contract.color.neutral[4]}`,
      cursor: 'pointer',
      transition: `all .15s ease`,

      selectors: {
        '&:hover': {
          backgroundColor: contract.color.neutral[2],
        },
      },
    },

    variants: {
      isConnected: {
        true: {
          backgroundColor: contract.color.green[1],
          border: `1px solid ${contract.color.green[3]}`,

          selectors: {
            '&:hover': {
              backgroundColor: contract.color.red[2],
              border: `1px solid ${contract.color.red[4]}`,
            },
          },
        },
        false: {},
      },
    },
  }),

  content: style({
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    gap: 1,
  }),

  span: recipe({
    base: {
      fontSize: 8,

      selectors: {
        '&:first-of-type': {
          textTransform: 'uppercase',
          color: contract.color.neutral[10],
        },
        '&:last-of-type': {
          fontSize: 12,
          color: contract.color.neutral[11],
        },
      },
    },

    variants: {
      isConnected: {
        true: {
          selectors: {
            '&:first-of-type': {
              color: contract.color.neutral[11],
            },
            '&:last-of-type': {
              color: contract.color.neutral[12],
            },
          },
        },
        false: {},
      },
    },
  }),
};
