import { contract, keyframes, recipe, shared, style } from '@pathfinder-ide/style';

const spinner = keyframes({
  to: {
    transform: `rotate(360deg)`,
  },
});

export const spinnerInnerClass = recipe({
  base: {
    display: 'block',
    borderRadius: '50%',
    animation: `${spinner} 0.75s ${shared.transitions.authenticMotion} infinite`,
  },
  variants: {
    size: {
      12: {
        width: contract.space[12],
        height: contract.space[12],
      },
      24: {
        width: contract.space[24],
        height: contract.space[24],
      },
    },
    theme: {
      dark: {
        border: `2px solid ${contract.color.neutral[4]}`,
        borderTopColor: `${contract.color.neutral[12]}`,
      },
      light: {
        border: `2px solid ${contract.color.neutral[12]}`,
        borderTopColor: `${contract.color.neutral[4]}`,
      },
    },
  },
});

export const spinnerOuterClass = style({
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: 0,
});
