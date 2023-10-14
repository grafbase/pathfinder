import { resizerStore } from "../resizer-store";
import { ResizerStoreActions } from "../resizer-store.types";

export const setPreviousSize: ResizerStoreActions["setPreviousSize"] = ({
  resizerName,
  value,
}) => {
  const resizer = resizerStore.getState()[resizerName];
  resizerStore.setState({ [resizerName]: { ...resizer, previousSize: value } });
};
