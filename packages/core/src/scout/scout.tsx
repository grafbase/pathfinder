import { useThemeStore } from "@pathfinder/stores";

import {
  Analyze,
  EditorTabs,
  Operate,
  Resizer,
  ScoutTools,
} from "../components";

import { scoutClass, scoutEditorWrapClass } from "./scout.css";

export const Scout = () => {
  const activeTheme = useThemeStore.use.activeTheme();

  if (!activeTheme) {
    return <p>you must wrap Scout with the Trailblazer component</p>;
  }

  return (
    <div className={scoutClass}>
      <Resizer
        onSurface={2}
        orientation="VERTICAL"
        pane1={{
          component: (
            <div className={scoutEditorWrapClass}>
              <EditorTabs />
              <Resizer
                onSurface={2}
                orientation="HORIZONTAL"
                pane1={{
                  component: <Operate />,
                }}
                pane2={{
                  component: <Analyze />,
                  initialSize: { type: "PERCENT", value: 50 },
                }}
              />
            </div>
          ),
        }}
        pane2={{
          component: <ScoutTools />,
          initialSize: { type: "PIXELS", value: 40 },
          minimumSize: 40,
        }}
      />
    </div>
  );
};
