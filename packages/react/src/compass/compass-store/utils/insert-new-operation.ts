import {
  FieldNode,
  InlineFragmentNode,
  Kind,
  OperationDefinitionNode,
  SelectionNode,
  print,
} from 'graphql';

import { DOCUMENT_EDITOR_ID } from '@pathfinder-ide/shared';

import {
  type MonacoIRange,
  pushMonacoEditorEdit,
  useGraphQLDocumentStore,
} from '@pathfinder-ide/stores';

import type { AncestorField, AncestorRoot, AncestorsArray } from '../compass-store.types';

export const insertNewOperation = ({
  ancestors,
  range,
}: {
  ancestors: AncestorsArray;
  range: MonacoIRange | 'END';
}) => {
  const operationType = (ancestors[0] as AncestorRoot).operationType;
  const topLevelFieldName = (ancestors[1] as AncestorField).field.name;

  const operationDefinition: OperationDefinitionNode = {
    kind: Kind.OPERATION_DEFINITION,
    name: {
      kind: Kind.NAME,
      value: `${topLevelFieldName.charAt(0).toUpperCase() + topLevelFieldName.slice(1)}`,
    },
    operation: operationType,
    selectionSet: {
      kind: Kind.SELECTION_SET,
      selections: [],
    },
  };

  const newNodes = [...ancestors].reverse().reduce(
    (acc, a) => {
      if (a.type === 'FIELD') {
        const fieldNode: FieldNode = {
          kind: Kind.FIELD,
          name: {
            kind: Kind.NAME,
            value: a.field.name,
          },
          selectionSet: {
            kind: Kind.SELECTION_SET,
            selections: [],
          },
        };
        acc.push(fieldNode);
      }
      if (a.type === 'INLINE_FRAGMENT') {
        const inlineFragmentNode: InlineFragmentNode = {
          kind: Kind.INLINE_FRAGMENT,
          typeCondition: {
            kind: Kind.NAMED_TYPE,
            name: { kind: Kind.NAME, value: a.onType },
          },
          selectionSet: {
            kind: Kind.SELECTION_SET,
            selections: [],
          },
        };
        acc.push(inlineFragmentNode);
      }
      return acc;
    },
    [] as Array<FieldNode | InlineFragmentNode>,
  );

  const selections = (): SelectionNode[] => {
    let node = newNodes.shift() as FieldNode | InlineFragmentNode;
    newNodes.forEach((newNode) => {
      node = {
        ...newNode,
        selectionSet: {
          kind: Kind.SELECTION_SET,
          selections: [node],
        },
      };
    });

    return [node];
  };

  const newOperationDefinitionNode: OperationDefinitionNode = {
    ...operationDefinition,
    selectionSet: {
      kind: Kind.SELECTION_SET,
      selections: selections(),
    },
  };

  const newLines =
    useGraphQLDocumentStore.getState().documentEntries.length > 0 ? '\n\n' : '';

  const printedNode = print(newOperationDefinitionNode);

  const text = `${newLines}${printedNode}`;

  return pushMonacoEditorEdit({
    edits: [{ range, text }],
    // mostly guaranteed that position will be EOF
    position: { column: 1000, lineNumber: 1000 },
    targetEditorId: DOCUMENT_EDITOR_ID,
  });
};
