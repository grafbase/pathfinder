import { getEntryForDefinition } from './get-entry-for-definition';
import { getMonacoEditor } from '../../monaco-editor-store';

import type {
  DocumentEntry,
  GraphQLDocumentStoreActions,
} from '../graphql-document-store.types';

import {
  DOCUMENT_EDITOR_ID,
  INACTIVE_DEFINITION_CLASSNAME,
} from '@pathfinder-ide/shared';

export const handleActiveDefinition: GraphQLDocumentStoreActions['handleActiveDefinition'] =
  ({ definition, range }) => {
    const entryForDefinition = getEntryForDefinition({ definition });

    const documentEditor = getMonacoEditor({ editorId: DOCUMENT_EDITOR_ID });

    if (documentEditor) {
      // here we're clearing only the INACTIVE_DEFINITION_CLASSNAME decoration
      const inactiveDefinitionDecorationsInRange = documentEditor
        .getDecorationsInRange(range)
        ?.filter(
          (decoration) =>
            decoration.options.inlineClassName === INACTIVE_DEFINITION_CLASSNAME,
        );

      const inactiveDefinitionDecorationIdsToRemove =
        inactiveDefinitionDecorationsInRange?.map((d) => d.id) as string[];

      documentEditor.removeDecorations(inactiveDefinitionDecorationIdsToRemove);
    }

    if (entryForDefinition) {
      return {
        ...entryForDefinition,
        node: definition,
      } as DocumentEntry;
    }
    return null;
  };
