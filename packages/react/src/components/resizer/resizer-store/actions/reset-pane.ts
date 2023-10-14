import { resizerStore } from "../resizer-store";
import { ResizerStoreActions } from "../resizer-store.types";

import { setPane1Size } from "./set-pane1-size";
import { setPreviousSize } from "./set-previous-size";

export const resetPane: ResizerStoreActions["resetPane"] = ({
  resizerName,
}) => {
  const { initialSize, pane1Size, previousSize } =
    resizerStore.getState()[resizerName];
  if (initialSize === pane1Size) {
    setPane1Size({ resizerName, value: previousSize });
  } else {
    setPreviousSize({ resizerName, value: pane1Size });
    setPane1Size({ resizerName, value: initialSize });
  }
};
