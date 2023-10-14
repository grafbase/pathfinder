import { resizerStore } from "../resizer-store";
import { ResizerStoreActions } from "../resizer-store.types";

export const setPane1Size: ResizerStoreActions["setPane1Size"] = ({
  resizerName,
  value,
}) => {
  const resizer = resizerStore.getState()[resizerName];
  resizerStore.setState({ [resizerName]: { ...resizer, pane1Size: value } });
};
