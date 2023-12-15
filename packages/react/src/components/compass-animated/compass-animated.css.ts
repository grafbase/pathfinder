import { contract, keyframes, recipe, shared, style } from '@pathfinder-ide/style';

export const compassAnimatedWrapClass = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: 0,
});

const spin = keyframes({
  from: {
    transform: 'rotate(0deg)',
  },
  to: {
    transform: 'rotate(360deg)',
  },
});

export const compassAnimatedClass = recipe({
  base: {},
  variants: {
    size: {
      'x-small': {
        height: 12,
        width: 12,
      },
      small: {
        height: 16,
        width: 16,
      },
      medium: {
        height: 24,
        width: 24,
      },
      large: {
        height: 36,
        width: 36,
      },
    },
  },
});

export const compassAnimatedSpinClass = recipe({
  base: {
    transformOrigin: 'center',
    animation: `${spin} 1s ${shared.transitions.authenticMotion} infinite`,
    fill: contract.color.neutral[12],
  },
  variants: {
    speed: {
      slow: {
        animationDuration: '1.25s',
      },
      standard: {
        animationDuration: '0.75s',
      },
      fast: {
        animationDuration: '0.5s',
      },
    },
  },
});

export const compassAnimatedOuterClass = style({
  fill: contract.color.neutral[12],
});
