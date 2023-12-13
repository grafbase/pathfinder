import { AvailableThemes } from '@pathfinder-ide/shared';

export const getUserPreferredTheme = () => (): AvailableThemes => {
  const media = matchMedia('(prefers-color-scheme:dark)');

  if (media.matches) {
    return 'dark';
  } else {
    return 'light';
  }
};
