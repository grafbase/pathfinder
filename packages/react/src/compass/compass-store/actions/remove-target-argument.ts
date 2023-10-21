import { GraphQLSchema } from 'graphql';

import { DOCUMENT_EDITOR_ID } from '@pathfinder-ide/shared';

import {
  EditorEdit,
  getMonacoEditor,
  pushMonacoEditorEdit,
  useSchemaStore,
} from '@pathfinder-ide/stores';

import type { AncestorArgument } from '../compass-store.types';

import { generateArgumentText, generateVariableText, getRemoveRange } from '../utils';

export const removeTargetArgument = ({ target }: { target: AncestorArgument }) => {
  const schema = useSchemaStore.getState().schema;

  const argument = target.argument;

  const documentEditor = getMonacoEditor({ editorId: DOCUMENT_EDITOR_ID });

  const position = documentEditor?.getPosition() || {
    column: 1,
    lineNumber: 1,
  };

  const argumentText = generateArgumentText({
    argument,
    schema: schema as GraphQLSchema,
  });

  const variableText = generateVariableText({
    argument,
  });

  const edits: EditorEdit[] = [];

  const variableRange = getRemoveRange({
    mode: 'VARIABLE_DEFINITION',
    target,
    text: variableText,
  });

  if (variableRange) {
    edits.push({
      range: variableRange,
      text: null,
    });
  }

  const argumentRange = getRemoveRange({
    mode: 'ARGUMENT',
    target,
    text: argumentText,
  });

  if (argumentRange) {
    edits.push({
      range: argumentRange,
      text: null,
    });
  }

  return pushMonacoEditorEdit({
    edits,
    position,
    targetEditorId: DOCUMENT_EDITOR_ID,
  });
};
