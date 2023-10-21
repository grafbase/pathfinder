import { recipe, shared, style } from '@pathfinder-ide/style';

export const detailsActionsClass = recipe({
  base: {
    transition: `all .35s ${shared.transitions.authenticMotion}`,
  },

  variants: {
    showActions: {
      true: {
        visibility: `visible`,
        opacity: 1,
      },
      false: {
        visibility: `hidden`,
        opacity: 0,
      },
    },
  },
});

export const detailsActionsControlsClass = style({
  display: `flex`,
  gap: 2,
  alignContent: `center`,
});
