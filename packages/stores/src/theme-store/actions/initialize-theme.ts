import {
  ThemeContractOverrides,
  getPrefersColorScheme,
} from "@pathfinder-ide/style";
import { setTheme } from "./set-theme";
import { setThemeOverrides } from "./set-theme-overrides";
import { AvailableThemes } from "@pathfinder-ide/shared";

export const initializeTheme = ({
  overrides,
}: {
  overrides?: ThemeContractOverrides;
}) => {
  // if we receive theme overrides, set them to state here
  if (overrides) {
    setThemeOverrides({ overrides });
  }

  let preference: AvailableThemes = "light";

  preference = getPrefersColorScheme();

  return setTheme({ theme: preference });
};
