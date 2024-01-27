import { setTheme } from './set-theme';
import { setThemeOverrides } from './set-theme-overrides';
import { ThemeOptions } from '../theme-store.types';
import { themeStore } from '../theme-store';

export const initializeTheme = ({
  options = { defaultTheme: 'system' },
}: {
  options?: ThemeOptions;
}) => {
  const isThemeInitialized = themeStore.getState().isInitialized;

  if (!isThemeInitialized) {
    // if we receive theme overrides, set them to state here
    if (options.overrides) {
      setThemeOverrides({ overrides: options.overrides });
    }

    return setTheme({ theme: options.defaultTheme ?? 'system' });
  }

  return;
};
