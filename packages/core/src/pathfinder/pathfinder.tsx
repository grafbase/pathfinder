import { useThemeStore } from "@pathfinder/stores";

import { Compass } from "../compass";
import { Resizer } from "../components";
import { Scout } from "../scout";

import { pathfinderContainer } from "./pathfinder.css";

export const Pathfinder = () => {
  const activeTheme = useThemeStore.use.activeTheme();

  if (!activeTheme) {
    return <p>you must wrap Pathfinder with the Trailblazer component</p>;
  }

  return (
    <div className={pathfinderContainer} data-testid="pathfinder-container">
      <Resizer
        onSurface={1}
        orientation="HORIZONTAL"
        pane1={{
          component: <Compass />,
        }}
        pane2={{
          component: <Scout />,
          initialSize: { type: "PERCENT", value: 70 },
        }}
      />
    </div>
  );
};
