# @pathfinder-ide/react

## 0.8.4

### Patch Changes

- cc382f0: SchemaDocs/DetailsPane visual updates (background color removed, borders added)

## 0.8.3

### Patch Changes

- d23fcaa: Updated UI to assist with navigating through large schemas.

## 0.8.2

### Patch Changes

- cc84020: Fixes lite mode issues with previous release.

## 0.8.1

### Patch Changes

- 33c7e3a: Removes worker loading from "lite" mode. Please ensure that your consuming applications are properly implementing and loading the following Monaco workers: editor, json, monaco-graphql.

## 0.8.0

### Minor Changes

- f362af9: Add a 'lite' variant to pathfinder-ide/react that doesn't include monaco-editor by default and allow the user to supply the monaco instance from his project

## 0.7.10

### Patch Changes

- 1c470b6: Add parent ObjectType info to tertiary panes of type GraphQLField

## 0.7.9

### Patch Changes

- fb5ecdf: Adds a prop (tertiaryPaneFieldSlotComponent) to the SchemaDocumentation component that accepts a ReactNode to be displayed in the TertiaryPane component when a field pane is active

## 0.7.8

### Patch Changes

- 4a0383d: Fix: fully remove automated tertiaryPaneStack clearing in favor of manual clearing

## 0.7.7

### Patch Changes

- 9dd3489: Fix tertiary nav stack clearing in SchemaDocs components

## 0.7.6

### Patch Changes

- ae28b0f: Refactors SchemaDocumentation to no longer require a context provider

## 0.7.5

### Patch Changes

- 5b048a9: fix: dont crash on spreads in operation root
- 89ce794: HistoryListItem: add formatBytes function and improve space available for readout.

## 0.7.4

### Patch Changes

- e6da8b9: Change SchemaView component to accept schema as a string

## 0.7.3

### Patch Changes

- f6f82cc: Removes border styling from core SchemaView component

## 0.7.2

### Patch Changes

- 1013845: Visual operation builder viz updates for deprecation notices and inline fragments.

## 0.7.1

### Patch Changes

- bb36561: Remove zIndex from active tab indicator. The zIndex doesn't effect its visibility in the Pathfinder UI and this element tends to show in front of UI that is overlayed on top of Pathfinder when integrated in other applications.

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
