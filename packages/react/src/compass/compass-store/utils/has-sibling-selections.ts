import type { AncestorTypes } from '../compass-store.types';

export const hasSiblingSelections = ({
  mode,
  previousAncestor,
}: {
  mode: 'ADD' | 'REMOVE';
  previousAncestor: AncestorTypes;
}): boolean => {
  const greaterThan = mode === 'ADD' ? 0 : 1;
  if (
    (previousAncestor.type === 'INLINE_FRAGMENT' || previousAncestor.type === 'FIELD') &&
    previousAncestor.selection &&
    'selectionSet' in previousAncestor.selection &&
    previousAncestor.selection.selectionSet
  ) {
    return previousAncestor.selection.selectionSet.selections.length > greaterThan;
  }
  if (
    previousAncestor.type === 'ROOT' &&
    previousAncestor.operationDefinition &&
    'selectionSet' in previousAncestor.operationDefinition &&
    previousAncestor.operationDefinition.selectionSet
  ) {
    return (
      previousAncestor.operationDefinition.selectionSet.selections.length > greaterThan
    );
  }
  return false;
};
