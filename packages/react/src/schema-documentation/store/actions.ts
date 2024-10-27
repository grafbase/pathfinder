import { generateCuid } from '@pathfinder-ide/shared';

import {
  GetSchemaDocumentationStore,
  SetSchemaDocumentationStore,
  SchemaDocumentationStoreActions,
  TertiaryPaneStackItem,
} from './schema-documentation-store.types';

export const schemaDocumentationStoreActions = (
  set: SetSchemaDocumentationStore,
  get: GetSchemaDocumentationStore,
): SchemaDocumentationStoreActions => ({
  navigatePanes: ({ index, pane }) => {
    const panes = get().panes;

    const slicedPanes = panes.slice(0, index + 1);

    if (pane) {
      return set({
        panes: [...slicedPanes, pane],
      });
    } else {
      return set({
        panes: [...slicedPanes],
      });
    }
  },
  clearPaneStack: () => {
    return set({
      panes: [],
    });
  },

  clearTertiaryPaneStack: () => {
    return set({
      activeTertiaryPane: null,
      tertiaryPaneStack: [],
    });
  },
  navigateTertiaryPaneStack: ({ destinationPaneIndex }) => {
    const tertiaryPaneStack = get().tertiaryPaneStack;

    return set({
      activeTertiaryPane: tertiaryPaneStack[destinationPaneIndex],
      // remove all panes after the destinationPaneIndex from our nav stack
      tertiaryPaneStack: tertiaryPaneStack.slice(0, destinationPaneIndex + 1),
    });
  },
  setActiveTertiaryPane: ({ destinationPane, reset = false }) => {
    // generate a unique id for our pane
    const paneHash = generateCuid({});

    const pane: TertiaryPaneStackItem = {
      hash: paneHash,
      pane: destinationPane,
    };
    if (reset) {
      return set({
        activeTertiaryPane: pane,
        tertiaryPaneStack: [pane],
      });
    } else {
      const tertiaryPaneStack = get().tertiaryPaneStack;
      return set({
        activeTertiaryPane: pane,
        tertiaryPaneStack:
          tertiaryPaneStack[0] !== null ? [...tertiaryPaneStack, pane] : [pane],
      });
    }
  },
});
