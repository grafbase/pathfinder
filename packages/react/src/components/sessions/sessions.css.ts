import { contract, shared, style } from '@pathfinder-ide/style';

export const sessionsClass = style({});

export const sessionSelectButtonClass = style([
  shared.resets.buttonReset,
  {
    padding: 12,
    marginBottom: 12,
    width: '100%',
    fontFamily: contract.fonts.mono,
    fontSize: 11,
    backgroundColor: contract.color.neutral[11],
    color: contract.color.neutral[2],
    fontWeight: 500,
    borderRadius: 2,
    transition: `all .1s ${shared.transitions.authenticMotion}`,

    selectors: {
      '&:hover': {
        backgroundColor: contract.color.neutral[12],
        color: contract.color.neutral[1],
      },
    },
  },
]);
