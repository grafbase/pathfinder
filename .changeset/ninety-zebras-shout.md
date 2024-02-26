---
'@pathfinder-ide/react': patch
---

Remove zIndex from active tab indicator. The zIndex doesn't effect its visibility in the Pathfinder UI and this element tends to show in front of UI that is overlayed on top of Pathfinder when integrated in other applications.
