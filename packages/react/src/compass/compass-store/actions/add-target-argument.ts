import { type GraphQLSchema, Location } from 'graphql';

import { DOCUMENT_EDITOR_ID } from '@pathfinder-ide/shared';

import type { AncestorArgument, AncestorField } from '../compass-store.types';

import { generateArgumentText, getAddEdit, getSelectedArgumentsCount } from '../utils';

import {
  type EditorEdit,
  getMonacoEditor,
  useSchemaStore,
  pushMonacoEditorEdit,
} from '@pathfinder-ide/stores';

export const addTargetArgument = ({
  previousAncestor,
  target,
}: {
  previousAncestor: AncestorField;
  target: AncestorArgument;
}) => {
  // console.log('addTargetArgument', { previousAncestor, target })

  const schema = useSchemaStore.getState().schema;

  const documentEditor = getMonacoEditor({ editorId: DOCUMENT_EDITOR_ID });

  const edits: EditorEdit[] = [];

  // if there's currently a valid cursor position in the operations editor,
  // use it for our final cursor position. otherwise, start of file.
  let position = documentEditor?.getPosition() || {
    column: 1,
    lineNumber: 1,
  };

  const argumentText = generateArgumentText({
    argument: target.argument,
    schema: schema as GraphQLSchema,
  });

  const selectedArgumentsCount = getSelectedArgumentsCount({
    previousAncestor,
  });

  const argumentTargetLocation = previousAncestor.selection?.loc as Location;

  const argumentEdit = getAddEdit({
    incomingText: argumentText,
    mode: 'ARGUMENT',
    siblingCount: selectedArgumentsCount,
    targetLocation: argumentTargetLocation,
  });

  if (argumentEdit) {
    edits.push({
      range: argumentEdit.range,
      text: argumentEdit.text,
    });
    position = {
      column: argumentEdit.range.endColumn + argumentEdit.text.length,
      lineNumber: argumentEdit.range.endLineNumber,
    };
  }

  // 👇 this mode is currently NOT available
  // TODO: enable this mode
  // if (argumentHandlingMode === 'WITH_VARIABLE') {
  //   const variableDefinitionsCount = getVariableDefinitionsCount()

  //   const variableTargetLocation = rootAncestor.operationDefinition
  //     ?.loc as Location

  //   const variableText = generateVariableText({
  //     argument: target.argument
  //   })

  //   const variableEdit = getAddEdit({
  //     incomingText: variableText,
  //     mode: 'VARIABLE_DEFINITION',
  //     siblingCount: variableDefinitionsCount,
  //     targetLocation: variableTargetLocation
  //   })

  //   if (variableEdit) {
  //     edits.push({
  //       range: variableEdit.range,
  //       text: variableEdit.text
  //     })
  //   }
  // }

  return pushMonacoEditorEdit({
    edits,
    position,
    targetEditorId: DOCUMENT_EDITOR_ID,
  });
};
