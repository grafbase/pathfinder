import { contract, recipe, shared, style } from '@pathfinder-ide/style';

export const argumentsClass = recipe({
  base: {
    position: 'relative',
    marginLeft: 4,
    // backgroundColor: contract.color.neutral[2],
    // borderRadius: 4,
    // border: `1px solid ${contract.color.neutral[3]}`,
  },

  variants: {
    isExpanded: {
      true: {
        marginBottom: contract.space[8],
      },
      false: {},
    },
  },
});

export const argumentsCollapseTriggerClass = style([
  shared.resets.buttonReset,
  {
    height: 24,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    gap: contract.space[4],
    fontSize: 11,
    color: contract.color.neutral[10],

    selectors: {
      '&:hover': {
        color: contract.color.neutral[12],
      },
    },
  },
]);

export const argumentsContentClass = style({
  width: '100%',
  marginLeft: contract.space[4],
  position: 'relative',

  selectors: {
    '&::after': {
      content: '',
      position: 'absolute',
      top: -4,
      left: 1,
      height: 'calc(100% - 5px)',
      width: 1,
      borderLeft: `1px solid ${contract.color.neutral[4]}`,
    },
  },
});

export const argumentsListClass = style({
  all: 'unset',
  margin: 0,
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
});
