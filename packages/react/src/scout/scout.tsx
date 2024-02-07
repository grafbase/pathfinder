import { useSessionStore, useThemeStore } from '@pathfinder-ide/stores';

import { Analyze, EditorTabs, Operate, Resizer, ScoutTools } from '../components';

import { scoutClass, scoutEditorWrapClass } from './scout.css';

export const Scout = () => {
  const activeTheme = useThemeStore.use.activeTheme();

  //@ts-ignore
  const endpoint = useSessionStore.use.endpoint();

  if (!activeTheme) {
    return <p>Please wrap Scout with the Pathfinder component</p>;
  }

  return (
    <div className={scoutClass}>
      <Resizer
        resizerName={'scout_resizer'}
        onSurface={1}
        orientation="VERTICAL"
        pane1={{
          component: (
            <div className={scoutEditorWrapClass}>
              <EditorTabs />
              <Resizer
                resizerName={'editors_resizer'}
                onSurface={1}
                orientation="HORIZONTAL"
                pane1={{
                  component: <Operate />,
                }}
                pane2={{
                  component: <Analyze />,
                  initialSize: { type: 'PERCENT', value: 50 },
                }}
              />
            </div>
          ),
        }}
        pane2={{
          component: endpoint ? <ScoutTools /> : <></>,
          initialSize: { type: 'PIXELS', value: 40 },
          minimumSize: 40,
        }}
      />
    </div>
  );
};
