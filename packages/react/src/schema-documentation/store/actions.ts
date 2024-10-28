import { generateCuid } from '@pathfinder-ide/shared';

import {
  GetSchemaDocumentationStore,
  SetSchemaDocumentationStore,
  SchemaDocumentationStoreActions,
  DetailsPaneStackItem,
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

  clearDetailsPaneStack: () => {
    return set({
      activeDetailsPane: null,
      detailsPaneStack: [],
    });
  },
  navigateDetailsPaneStack: ({ destinationPaneIndex }) => {
    const detailsPaneStack = get().detailsPaneStack;

    return set({
      activeDetailsPane: detailsPaneStack[destinationPaneIndex],
      // remove all panes after the destinationPaneIndex from our nav stack
      detailsPaneStack: detailsPaneStack.slice(0, destinationPaneIndex + 1),
    });
  },
  setActiveDetailsPane: ({ destinationPane, reset = false }) => {
    // generate a unique id for our pane
    const paneHash = generateCuid({});

    const pane: DetailsPaneStackItem = {
      hash: paneHash,
      pane: destinationPane,
    };
    if (reset) {
      return set({
        activeDetailsPane: pane,
        detailsPaneStack: [pane],
      });
    } else {
      const detailsPaneStack = get().detailsPaneStack;
      return set({
        activeDetailsPane: pane,
        detailsPaneStack:
          detailsPaneStack[0] !== null ? [...detailsPaneStack, pane] : [pane],
      });
    }
  },
});
