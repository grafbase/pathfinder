import { getMonacoEditor } from '../../monaco-editor-store';

import {
  DOCUMENT_EDITOR_ID,
  INACTIVE_DEFINITION_CLASSNAME,
} from '@pathfinder-ide/shared';

import type { GraphQLDocumentStoreActions } from '../graphql-document-store.types';

// all we're doing here for now is ensuring that this definition is wrapped in the decoration/classname so we can change the opacity
export const handleInactiveDefinition: GraphQLDocumentStoreActions['handleInactiveDefinition'] =
  ({ range }) => {
    const documentEditor = getMonacoEditor({ editorId: DOCUMENT_EDITOR_ID });

    if (documentEditor) {
      // get all decorations in the range of this definition and check if any of them are our INACTIVE_DEFINITION_CLASSNAME
      const inactiveDefinitionDecorationInRange = documentEditor
        .getDecorationsInRange(range)
        ?.some(
          (decoration) =>
            decoration.options.inlineClassName === INACTIVE_DEFINITION_CLASSNAME,
        );

      // if our INACTIVE_DEFINITION_CLASSNAME decoration doesn't exist, let's create it
      if (!inactiveDefinitionDecorationInRange) {
        documentEditor.createDecorationsCollection([
          {
            range,
            options: { inlineClassName: INACTIVE_DEFINITION_CLASSNAME },
          },
        ]);
      }
    }
  };
