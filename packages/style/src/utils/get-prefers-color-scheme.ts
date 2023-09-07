import type { AvailableThemes } from "@graphql-pathfinder/shared";

export const getPrefersColorScheme = (): AvailableThemes => {
  if (window.matchMedia("(prefers-color-scheme:dark)").matches) {
    return "dark";
  } else {
    return "light";
  }
};
