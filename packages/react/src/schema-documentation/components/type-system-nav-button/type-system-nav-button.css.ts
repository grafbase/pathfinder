import { contract, recipe, shared } from '@pathfinder-ide/style';

export const typeSystemNavButtonClass = recipe({
  base: [
    shared.resets.buttonReset,
    {
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      height: 40,
      paddingLeft: 12,
      paddingRight: 12,
      color: contract.color.neutral[12],

      borderRadius: 6,

      selectors: {
        '&:hover': {
          backgroundColor: contract.color.neutral[2],
        },
      },
    },
  ],

  variants: {
    isActive: {
      true: {
        backgroundColor: contract.color.neutral[3],
        color: contract.color.neutral[12],
        fontWeight: 500,

        selectors: {
          '&:hover': {
            backgroundColor: contract.color.neutral[3],
            color: contract.color.neutral[12],
          },
        },
      },
    },
  },
});
