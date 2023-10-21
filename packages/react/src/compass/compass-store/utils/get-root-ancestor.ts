import type { AncestorRoot, AncestorsArray } from '../compass-store.types';

export const getRootAncestor = ({ ancestors }: { ancestors: AncestorsArray }) => {
  return ancestors[0] as AncestorRoot;
};
