import { contract, recipe, shared, style } from '@pathfinder-ide/style';

export const detailsTogglerClass = recipe({
  base: [
    shared.resets.buttonReset,
    {
      whiteSpace: 'nowrap',
      height: 22,
      fontSize: 14,
      display: 'flex',
      alignItems: 'center',
      transition: `all .1s ${shared.transitions.authenticMotion}`,

      selectors: {
        '&:hover': {
          color: contract.color.neutral[12],
        },

        '&:disabled': {
          cursor: 'not-allowed',
          color: contract.color.neutral[6],
        },

        '&:disabled&:hover': {
          color: contract.color.neutral[6],
        },
      },
    },
  ],

  variants: {
    variant: {
      ARGUMENT: {},
      FIELD: {
        paddingRight: 4,
        paddingLeft: 4,
        borderRadius: 4,
      },
      INLINE_FRAGMENT: {},
      INPUT_OBJECT: {},
    },
    isSelected: {
      true: {
        fontWeight: 600,
        color: contract.color.neutral[12],

        selectors: {
          '&:hover': {
            color: contract.color.neutral[12],
          },
        },
      },
      false: {
        color: contract.color.neutral[11],
      },
    },
  },
});

export const detailsClass = style({
  display: 'flex',
  alignItems: 'center',
  gap: contract.space[4],
  width: `100%`,
});

export const inlineFragmentClass = recipe({
  base: {
    fontSize: 14,
  },
  variants: {
    isSelected: {
      true: {
        color: contract.color.neutral[12],
        fontWeight: 600,
      },
      false: {
        color: contract.color.neutral[11],
      },
    },
  },
});
