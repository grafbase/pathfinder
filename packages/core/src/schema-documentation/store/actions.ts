import { generateCuid } from "@pathfinder/shared";

import {
  GetSchemaDocumentationStore,
  SetSchemaDocumentationStore,
  SchemaDocumentationStoreActions,
} from "./schema-documentation-store.types";

export const schemaDocumentationStoreActions = (
  set: SetSchemaDocumentationStore,
  get: GetSchemaDocumentationStore,
): SchemaDocumentationStoreActions => ({
  setActivePrimaryPane: ({ destinationPane }) => {
    set({ activePrimaryPane: destinationPane });
  },
  clearTertiaryPaneStack: () => {
    set({
      activeTertiaryPane: null,
      tertiaryPaneStack: [],
    });
  },
  navigateTertiaryPaneStack: ({ destinationPaneIndex }) => {
    const tertiaryPaneStack = get().tertiaryPaneStack;

    set({
      activeTertiaryPane: tertiaryPaneStack[destinationPaneIndex],
      // remove all panes after the destinationPaneIndex from our nav stack
      tertiaryPaneStack: tertiaryPaneStack.slice(0, destinationPaneIndex + 1),
    });
  },
  setActiveTertiaryPane: ({ destinationPane, reset = false }) => {
    // generate a unique id for our pane
    const paneHash = generateCuid({});

    const pane = { hash: paneHash, pane: destinationPane };
    if (reset) {
      set({
        activeTertiaryPane: pane,
        tertiaryPaneStack: [pane],
      });
    } else {
      const tertiaryPaneStack = get().tertiaryPaneStack;
      set({
        activeTertiaryPane: pane,
        tertiaryPaneStack:
          tertiaryPaneStack[0] !== null ? [...tertiaryPaneStack, pane] : [pane],
      });
    }
  },
});
