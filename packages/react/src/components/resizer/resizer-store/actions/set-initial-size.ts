import { resizerStore } from "../resizer-store";
import { ResizerStoreActions } from "../resizer-store.types";

export const setInitialSize: ResizerStoreActions["setInitialSize"] = ({
  resizerName,
  value,
}) => {
  const resizer = resizerStore.getState()[resizerName];
  resizerStore.setState({ [resizerName]: { ...resizer, initialSize: value } });
};
