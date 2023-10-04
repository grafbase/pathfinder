import { recipe, shared } from "@pathfinder/style";
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
