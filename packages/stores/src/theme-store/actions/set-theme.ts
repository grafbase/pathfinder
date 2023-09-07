import type { AvailableThemes } from "@graphql-pathfinder/shared";

import { themeStore } from "../theme-store";
import { THEME_MODE_ATTRIBUTE } from "@graphql-pathfinder/style";

import { mungeThemeOverrides } from "../utils";
import { setMonacoEditorTheme } from "../../monaco-editor-store";

export const setTheme = ({ theme }: { theme: AvailableThemes }) => {
  const rootEl = document.documentElement;

  themeStore.setState({ activeTheme: theme });
  setMonacoEditorTheme({ theme });

  // pull out the overrides for the theme we're setting
  const overrides = themeStore.getState().themeOverrides;

  if (overrides) {
    // munge them so we get an object with keys that we can split to get our target theme and css variable names
    const mungedOverrides = mungeThemeOverrides({ overrides });

    // the object we create above does not order our overrides; the final object is similar in shape to the original override props, which
    // means they could be in any order.
    // we need to be careful about forEaching over this object as the possibility exists that we'd set a target property and then very quickly
    // remove it, based on where it is in the object.
    // so, rather than sorting or filtering the object, we just collect properties that we'd like to set here and then set each of them
    // _after_ we've removed the outgoing properties.
    const toSet: Array<{ property: string; value: string }> = [];

    Object.entries(mungedOverrides).forEach((entry) => {
      const split = entry[0].split("__");

      if (split[0] !== theme) {
        // immediately remove overrides for previous theme
        rootEl.style.removeProperty(split[1]);
      } else {
        // these are overrides that we need to set after we've removed those that don't match our target theme
        toSet.push({ property: split[1], value: entry[1] as string });
      }
    });

    // after we've removed old/outgoing properties, we set our new/incoming properties based on our toSet list
    toSet.forEach((item) => {
      rootEl.style.setProperty(item.property, item.value);
    });
  }

  // finally, we set the theme mode on our top element
  return rootEl.setAttribute(THEME_MODE_ATTRIBUTE, theme);
};
