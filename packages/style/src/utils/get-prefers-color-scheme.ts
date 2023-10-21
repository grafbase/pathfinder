import type { AvailableThemes } from '@pathfinder-ide/shared';

export const getPrefersColorScheme = (): AvailableThemes => {
  if (window.matchMedia('(prefers-color-scheme:dark)').matches) {
    return 'dark';
  } else {
    return 'light';
  }
};
