import { contract, globalStyle, shared, recipe } from '@pathfinder-ide/style';

export const iconClass = recipe({
  base: {
    display: 'flex',
    transform: 'rotate(0deg)',
  },

  variants: {
    rotate: {
      '90': {
        transform: `rotate(90deg)`,
      },
      '180': {
        transform: `rotate(180deg)`,
      },
      '270': {
        transform: `rotate(270deg)`,
      },
    },
    size: {
      small: {
        height: contract.space[12],
        width: contract.space[12],
      },
      medium: {
        height: contract.space[16],
        width: contract.space[16],
      },
      large: {
        height: contract.space[20],
        width: contract.space[20],
      },
    },
  },
});

globalStyle(`${iconClass()} svg path`, {
  fill: contract.color.neutral[11],
  transition: `all .15s ${shared.transitions.authenticMotion}`,
});
