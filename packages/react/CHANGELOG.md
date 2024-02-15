# @pathfinder-ide/react

## 0.7.0

### Minor Changes

- 5bb9d39: Unlock fragments by passing entire active document through each request rather than just the active operation.

## 0.6.0

### Minor Changes

- dba122c: Add subscription support via SSE exclusively.

## 0.5.0

### Minor Changes

- 89129be: Make the graphql dependency a peer dependency

### Patch Changes

- 48a3057: Add latest response latency to Response pane header

## 0.4.0

### Minor Changes

- 96db268: Allows Pathfinder to accept a GraphQLSchema as a prop to prevent introspection.
- 64413c5: Add Pathfinder prop to allow watching of certain headers and display in history pane

### Patch Changes

- 23157e9: updates SchemaView and SchemaDocumentation components with optional themeOptions props

## 0.3.4

### Patch Changes

- cf31398: Fixes an issue with Monaco editors disposing prematurely when PathfinderProps change.

## 0.3.3

### Patch Changes

- 22cea1b: Reset state when Pathfinder unmounts.

## 0.3.2

### Patch Changes

- 1611586: Proper handling of "system" theme type.

## 0.3.1

### Patch Changes

- 44758d5: Updates Pathfinder mode options, but keeps the default mode as the complete view with schema documentation and SDL view.

## 0.3.0

### Minor Changes

- fa14fb9: Updates the `themeOptions` prop to include a `defaultTheme` ("light" | "dark" | "system"). If the `defaultTheme` is either "light" or "dark", Pathfinder will respect the choice. If the prop is not passed, or passed as "system", Pathfinder will listen for changes to `prefers-color-scheme` and respond accordingly.

## 0.2.6

### Patch Changes

- e093430: Configures the Resizer component to respect passed-in pane2 minimum size on `window.resize`.
- 01dbed7: Visual improvements to the Editor component.
- 988b1c1: Refactors the Resizer component for performance reasons.
- ef67fe2: Improves readability in the schema documentation by adjusting color and spacing.

## 0.2.5

### Patch Changes

- ebe7828: Increases default font size for monaco editors

## 0.2.4

### Patch Changes

- 3bb7dce: - Increases the font size app-wide
  - Reverts the monaco editor theme and compass styles for fields/arguments to white
  - Updates nav buttons with aria-label and button title
  - Sets default editor tab name to "Untitled"

## 0.2.3

### Patch Changes

- 0512c00: Fixes a bug introduced in #142

## 0.2.2

### Patch Changes

- d2e19df: Fixes a bug in initSession and update packaging.

## 0.2.1

### Patch Changes

- 86ef9b4: Test release: Moves `stores` back to devDependencies.

## 0.2.0

### Minor Changes

- 421d00a: \* Updates Pathfinder props to be more user-friendly
  - fixes a regression in schema polling

### Patch Changes

- 31a5661: SchemaDocumentation and SchemaView components are now exported and can be used independently.
- b4d3360: Export theme store functions to allow external control of theme. You can now import `setPathfinderTheme` and `usePathfinderThemeStore` if you need to set the theme (light/dark) from outside the Pathfinder UI.

## 0.1.3

### Patch Changes

- b65fdfc: Bump for release

## 0.1.2

### Patch Changes

- 084257f: Renames publishable package

## 0.1.1

### Patch Changes

- e331579: Initial release
