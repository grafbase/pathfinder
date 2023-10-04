import { setTheme, useThemeStore } from "@pathfinder/stores";

export const ThemeSwitcher = () => {
  const activeTheme = useThemeStore.use.activeTheme();

  return (
    <div>
      <button
        onClick={() => {
          if (activeTheme === "dark") {
            return setTheme({ theme: "light" });
          }
          return setTheme({ theme: "dark" });
        }}
      >
        switch themes
      </button>
    </div>
  );
};
