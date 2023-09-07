import {
  ThemeContractOverrides,
  getPrefersColorScheme,
} from "@graphql-pathfinder/style";
import { setTheme } from "./set-theme";
import { setThemeOverrides } from "./set-theme-overrides";
import { AvailableThemes } from "@graphql-pathfinder/shared";

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
