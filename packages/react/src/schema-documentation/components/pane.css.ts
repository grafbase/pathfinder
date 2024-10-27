import { recipe, shared } from '@pathfinder-ide/style';
import { sharedPaneClass } from '../shared.styles.css';

export const paneClass = recipe({
  base: [
    shared.scrollbars,
    sharedPaneClass,
    {
      display: 'flex',
      flexDirection: 'column',
    },
  ],

  variants: {
    activeTertiaryPane: {
      true: {
        flexGrow: 0,
      },
    },
  },
});
