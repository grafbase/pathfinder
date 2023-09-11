import { contract, keyframes, recipe, shared, style } from "@pathfinder/style";

const spin = keyframes({
  from: {
    transform: "rotate(0deg)",
  },
  to: {
    transform: "rotate(360deg)",
  },
});

export const compassAnimatedClass = recipe({
  base: {},
  variants: {
    size: {
      "x-small": {
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

export const compassAnimatedSpinClass = style({
  transformOrigin: "center",
  animation: `${spin} 1s ${shared.transitions.authenticMotion} -0.9s infinite`,
  fill: contract.color.neutral[12],
});

export const compassAnimatedOuterClass = style({
  fill: contract.color.neutral[12],
});
