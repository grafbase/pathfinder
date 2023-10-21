import { type AncestorTypes } from '../compass-store.types';

export const getLocationFromAncestor = ({ ancestor }: { ancestor: AncestorTypes }) => {
  if (
    (ancestor.type === 'INLINE_FRAGMENT' || ancestor.type === 'FIELD') &&
    ancestor.selection
  ) {
    return ancestor.selection.loc;
  }
  if (ancestor.type === 'ROOT' && ancestor.operationDefinition) {
    return ancestor.operationDefinition.loc;
  }
  return null;
};
