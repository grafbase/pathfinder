import { container } from "./pathfinder.css";

import { useThemeStore } from "@pathfinder/stores";

import { Scout } from "../scout";

export const Pathfinder = () => {
  const activeTheme = useThemeStore.use.activeTheme();

  if (!activeTheme) {
    return <p>you must wrap Pathfinder with the Trailblazer component</p>;
  }

  return (
    <>
      <div className={container}>pathfinder -- {activeTheme}</div>
      <Scout />
    </>
  );
};
