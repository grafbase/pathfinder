---
'@pathfinder-ide/react': minor
---

Updates the `themeOptions` prop to include a `defaultTheme` ("light" | "dark" | "system"). If the `defaultTheme` is either "light" or "dark", Pathfinder will respect the choice. If the prop is not passed, or passed as "system", Pathfinder will listen for changes to `prefers-color-scheme` and respond accordingly.
