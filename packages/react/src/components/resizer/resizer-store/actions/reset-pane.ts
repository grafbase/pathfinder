import { resizerStore } from "../resizer-store";
import { ResizerStoreActions } from "../resizer-store.types";
import { getInitialGridTemplate } from "./get-initial-grid-template";
import { setResizerState } from "./set-resizer-state";

export const resetPane: ResizerStoreActions["resetPane"] = ({
  resizerName,
}) => {
  const { pane2InitialSize } = resizerStore.getState()[resizerName];

  const initialGridTemplate = getInitialGridTemplate({
    pane2InitialSize,
  });

  setResizerState({
    name: resizerName,
    updates: {
      gridTemplate: initialGridTemplate,
      startingGridTemplate: initialGridTemplate,
    },
  });
};
