import { setTheme } from './set-theme';

let remove: (() => void) | null = null;

export const listenForPrefersColorSchemeChange = () => {
  if (remove != null) {
    remove();
  }
  const media = matchMedia('(prefers-color-scheme:dark)');

  if (media.matches) {
    setTheme({ theme: 'dark' });
  } else {
    setTheme({ theme: 'light' });
  }

  media.addEventListener('change', listenForPrefersColorSchemeChange);

  remove = () => {
    media.removeEventListener('change', listenForPrefersColorSchemeChange);
  };
};
