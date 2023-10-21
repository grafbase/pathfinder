import { resizerStore } from '../resizer-store';
import { ResizerStoreActions } from '../resizer-store.types';

export const setResizerState: ResizerStoreActions['setResizerState'] = ({
  name,
  updates,
}) => {
  const existingResizer = resizerStore.getState()[name];
  return resizerStore.setState({
    [name]: { ...existingResizer, ...updates },
  });
};
