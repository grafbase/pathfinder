import { recipe, shared } from "@pathfinder-ide/style";
import { sharedPaneClass } from "../../shared.styles.css";

export const secondaryPaneClass = recipe({
  base: [shared.scrollbars, sharedPaneClass],

  variants: {
    activeTertiaryPane: {
      true: {
        flexGrow: 0,
      },
    },
  },
});
