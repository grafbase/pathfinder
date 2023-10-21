import type { AncestorField, AncestorInlineFragment } from '../compass-store.types';

export const getAncestorText = ({
  ancestor,
}: {
  ancestor: AncestorField | AncestorInlineFragment;
}) => {
  if (ancestor.type === 'FIELD') {
    return ancestor.field.name;
  }
  if (ancestor.type === 'INLINE_FRAGMENT') {
    return `... on ${ancestor.onType}`;
  }
  return console.error('error generating ancestor text');
};
