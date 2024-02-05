import { Kind, OperationDefinitionNode, isExecutableDefinitionNode } from 'graphql';

import { DOCUMENT_EDITOR_ID } from '@pathfinder-ide/shared';

import { getLocationAndRangeForDefinition, parseDocument } from '../utils';

import { graphQLDocumentStore } from '../graphql-document-store';

import type { DocumentEntry } from '../graphql-document-store.types';

import { getMonacoEditor } from '../../monaco-editor-store';
import { updateActiveEditorTab } from '../../session-store';

import { handleActiveDefinition } from './handle-active-definition';
import { handleInactiveDefinition } from './handle-inactive-definition';
import { isOperationNameChanging } from './is-operation-name-changing';
import { resetDocumentState } from './reset-document-state';
import { setDocumentNotifications } from './set-document-notifications';
import { updateDocumentEntryOperationName } from './update-document-entry-operation-name';

type SetDocumentStateSignature = () => void;

export const setDocumentState: SetDocumentStateSignature = () => {
  const documentEditor = getMonacoEditor({ editorId: DOCUMENT_EDITOR_ID });

  const model = documentEditor?.getModel();

  if (model && documentEditor) {
    const modelValue = model.getValue();

    let newActiveDocumentEntry: DocumentEntry | null = null;

    const parsedDocument = parseDocument({ documentString: modelValue });

    if (!parsedDocument) {
      // we've an empty editor (either user-cleared or cleared via pathfinder) so we reset our document state
      return resetDocumentState();
    }

    if (parsedDocument && parsedDocument instanceof Error) {
      // if we're here, it means we weren't able to parse the document
      // this happens often, as we attempt to parse _everytime_ the cursor position changes, such as when a user is typing
      return graphQLDocumentStore.setState({
        isParseable: false,
      });
    } else {
      const definitions = [...parsedDocument.definitions];

      // check for specific warnings that we display in a simple notification UI
      setDocumentNotifications({ definitions });

      // if we've set documentNotifications in the function above, we return early to allow the user to fix notifications/warnings
      if (graphQLDocumentStore.getState().documentNotifications.length > 0) {
        return undefined;
      }

      // a list that we can push to as we forEach through our definitions
      // this method for capturing and writing entries allows for "deleting" entries from the state array when a user removes the operation/entry from the document

      definitions.forEach((definition) => {
        if (!isExecutableDefinitionNode(definition)) {
          // TODO: do we display a documentNotification here to direct users to a (currently non-existent) docs section?
          return console.warn('Not an ExecutableDefinitionNode');
        }

        if (definition.kind === Kind.FRAGMENT_DEFINITION) {
          // we don't do anything with FragmentDefinitions...yet
          // this is currently just a guard to ensure we're operating over OperationDefinitionNodes
        } else if (definition.kind === Kind.OPERATION_DEFINITION) {
          // if the user is updating this operation name, we need to make that update before anything else
          if (isOperationNameChanging({ definition, definitions })) {
            updateDocumentEntryOperationName({
              definition,
            });
          }

          // we get our current cursor position...
          const currentCursorPosition = documentEditor.getPosition();

          // ...and the location and range data for the definition so we can determine if our cursor is within our definition
          const { range, startLine, endLine } = getLocationAndRangeForDefinition({
            definition,
          });

          if (
            currentCursorPosition &&
            currentCursorPosition.lineNumber >= startLine &&
            currentCursorPosition.lineNumber <= endLine
          ) {
            // if the cursor is within this definition
            newActiveDocumentEntry = handleActiveDefinition({
              definition,
              range,
            });
          } else {
            // if the cursor is not within this definition
            handleInactiveDefinition({ range });
          }
        }
      });

      graphQLDocumentStore.setState({
        activeDocumentEntry: newActiveDocumentEntry,
        isParseable: true,
      });

      return updateActiveEditorTab({
        partialTab: {
          documentString: modelValue,
          tabName: (parsedDocument.definitions[0] as OperationDefinitionNode).name?.value,
        },
      });
    }
  }

  return undefined;
};
