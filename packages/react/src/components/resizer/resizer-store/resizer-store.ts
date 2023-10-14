import { createStore } from "zustand/vanilla";

import type { ResizerStore } from "./resizer-store.types";

export const resizerStore = createStore<ResizerStore>()(() => ({
  ide_resizer: {
    name: "ide_resizer",
    initialSize: 0,
    pane1Size: 0,
    previousSize: 0.5,
  },
  editors_resizer: {
    name: "editors_resizer",
    initialSize: 0,
    pane1Size: 0,
    previousSize: 0.5,
  },
  scout_resizer: {
    name: "scout_resizer",
    initialSize: 0,
    pane1Size: 0,
    previousSize: 0.5,
  },
  history_resizer: {
    name: "history_resizer",
    initialSize: 0,
    pane1Size: 0,
    previousSize: 0.5,
  },
  schema_docs_1: {
    name: "schema_docs_1",
    initialSize: 0,
    pane1Size: 0,
    previousSize: 0.5,
  },
  schema_docs_2: {
    name: "schema_docs_2",
    initialSize: 0,
    pane1Size: 0,
    previousSize: 0.5,
  },
}));
