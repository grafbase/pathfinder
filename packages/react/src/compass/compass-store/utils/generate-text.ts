import { INDENT_SIZE } from '../constants';

import { getAncestorText } from './get-ancestor-text';

import type {
  AncestorField,
  AncestorInlineFragment,
  AncestorsArray,
} from '../compass-store.types';

export const generateText = ({
  allUnselectedAncestors,
  ancestors,
  nearestSelectedAncestor,
  nearestSelectedAncestorHasSelections,
}: {
  allUnselectedAncestors: (AncestorField | AncestorInlineFragment)[];
  ancestors: AncestorsArray;
  nearestSelectedAncestor: AncestorField | AncestorInlineFragment | undefined;
  nearestSelectedAncestorHasSelections: boolean;
}) => {
  const allUnselectedAncestorsLength = allUnselectedAncestors.length;

  // if we have a nearest selected ancestor (meaning we're adding to a selected field, not to the root operation)
  // and that ancestor does not have selections, we should add wrapping brackets
  const shouldAddWrappingBrackets =
    !!nearestSelectedAncestor && !nearestSelectedAncestorHasSelections;

  let fieldText = '';
  let bracketText = '';

  if (shouldAddWrappingBrackets) {
    fieldText += ` {\n`;
  }

  // a variable to hold the count of the number of spaces to indent each of our fields
  // we increment this for every field
  let fieldIndentCount = (ancestors.length - allUnselectedAncestorsLength) * INDENT_SIZE;

  // a variable to hold the count of the number of spaces to indent the closing brackets on each of our fields (where necessary)
  // we decrement this for every field/bracket
  let bracketIndentCount = (ancestors.length - 2) * INDENT_SIZE;

  allUnselectedAncestors.forEach((a, index) => {
    const fieldIndent = ' '.repeat(fieldIndentCount);
    fieldText += fieldIndent;
    fieldText += getAncestorText({ ancestor: a });
    // if this is our target selection, don't include an extra space
    if (allUnselectedAncestorsLength - index !== 1) {
      // otherwise, this space is critical
      fieldText += ' ';
    }
    fieldText += `${index < allUnselectedAncestorsLength - 1 ? '{\n' : '\n'}`;
    fieldIndentCount += 2;

    const bracketIndent = `${' '.repeat(bracketIndentCount)}}\n`;
    bracketText += `${index < allUnselectedAncestorsLength - 1 ? bracketIndent : ''}`;
    bracketIndentCount -= 2;
  });

  if (shouldAddWrappingBrackets) {
    bracketText += `${' '.repeat(bracketIndentCount + 2)}}`;
  }
  const text = fieldText + bracketText;

  return text;
};
