import { AncestorsArray } from '../compass-store.types';

// selection breadcrumbs help identify toggle buttons in tests
export const generateSelectionBreadcrumbsFromAncestors = ({
  ancestors,
}: {
  ancestors: AncestorsArray;
}) =>
  [...ancestors]
    // eslint-disable-next-line consistent-return
    .map((ancestor) => {
      if (ancestor.type === 'FIELD') {
        return ancestor.field.name;
      }
      if (ancestor.type === 'ARGUMENT') {
        return ancestor.argument.name;
      }
      if (ancestor.type === 'INLINE_FRAGMENT') {
        return `on${ancestor.onType}`;
      }
    })
    .join('/');
