import { useThemeStore } from '@pathfinder-ide/stores';

import { Compass } from '../compass';
import { Resizer } from '../components';
import { Scout } from '../scout';

export const IDE = () => {
  const activeTheme = useThemeStore.use.activeTheme();

  if (!activeTheme) {
    return <p>Please wrap IDE with the Pathfinder component.</p>;
  }

  return (
    <Resizer
      resizerName={'ide_resizer'}
      onSurface={1}
      orientation="HORIZONTAL"
      pane1={{
        component: <Compass />,
      }}
      pane2={{
        component: <Scout />,
        initialSize: { type: 'PERCENT', value: 70 },
      }}
    />
  );
};
