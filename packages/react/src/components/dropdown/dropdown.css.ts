import {
  contract,
  keyframes,
  recipe,
  shared,
  style,
} from "@pathfinder-ide/style";

export const menuButtonWrapClass = style({
  display: "flex",
  justifyContent: "right",
});

export const menuClass = style({
  position: "relative",
});

const animateIn = keyframes({
  "100%": { opacity: 1 },
  "0%": { opacity: 0 },
});

export const menuItemsClass = recipe({
  base: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
    border: `1px solid ${contract.color.neutral[5]}`,
    borderRadius: contract.space[4],
    backgroundColor: contract.color.neutral[3],
    padding: contract.space[8],
    width: 220,
    position: "absolute",
    top: 28,
    right: 0,
    zIndex: 1,
    animation: `${animateIn} .15s ${shared.transitions.authenticMotion}`,
  },

  variants: {
    size: {
      small: {
        top: 24,
      },
      medium: {
        top: 32,
      },
      large: {
        top: 36,
      },
    },
  },
});
