import { INACTIVE_DEFINITION_CLASSNAME } from "@pathfinder-ide/shared";

import { recipe, globalStyle } from "@pathfinder-ide/style";

export const editorClass = recipe({
  base: {
    height: "100%",
    width: "100%",
    display: "flex",
    flex: 1,
    minWidth: 0,
    minHeight: 64,

    // a little hack to prevent the potential flash of alternate editor theme colors on initialization
    transition: "opacity .15s ease",
  },

  variants: {
    isInitialized: {
      true: {
        opacity: 1,
        visibility: "visible",
      },
      false: {
        opacity: 0,
        visibility: "hidden",
      },
    },
  },
});

globalStyle(`.${INACTIVE_DEFINITION_CLASSNAME}`, {
  opacity: 0.25,
});
