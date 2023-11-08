import { setTheme } from './set-theme';
import { setThemeOverrides } from './set-theme-overrides';
import { ThemeOptions } from '../theme-store.types';
import { listenForPrefersColorSchemeChange } from './listen-for-prefers-color-scheme-change';

export const initializeTheme = ({
  options = { defaultTheme: 'system' },
}: {
  options?: ThemeOptions;
}) => {
  // if we receive theme overrides, set them to state here
  if (options.overrides) {
    setThemeOverrides({ overrides: options.overrides });
  }

  if (options.defaultTheme === 'dark' || options.defaultTheme === 'light') {
    return setTheme({ theme: options.defaultTheme });
  } else {
    return listenForPrefersColorSchemeChange();
  }
};
