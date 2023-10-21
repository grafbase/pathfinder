import { kbdClass } from './kbd.css';

const keyMap = {
  COMMAND_CONTROL: {
    mac: '⌘',
    other: 'Ctrl',
  },
  RETURN: {
    mac: '↩',
    other: '↩',
  },
};

export const KBD = ({ shortcut }: { shortcut: keyof typeof keyMap }) => {
  const isMacUserAgent = navigator.platform.toUpperCase().indexOf('MAC') >= 0;

  return (
    <kbd className={kbdClass}>{keyMap[shortcut][isMacUserAgent ? 'mac' : 'other']}</kbd>
  );
};
