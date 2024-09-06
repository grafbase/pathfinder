---
'@pathfinder-ide/react': patch
---

Removes worker loading from "lite" mode. Please ensure that your consuming applications are properly implementing and loading the following Monaco workers: editor, json, monaco-graphql.
