import { DOCUMENT_EDITOR_ID } from '@pathfinder-ide/shared';
import { getMonacoEditor } from '../../monaco-editor-store';
import { parseDocument } from '../utils';

export const getParsedDocument = () => {
  const documentEditor = getMonacoEditor({ editorId: DOCUMENT_EDITOR_ID });

  const model = documentEditor?.getModel();

  if (model) {
    const modelValue = model?.getValue();

    const parsedDocument = parseDocument({ documentString: modelValue });
    if (!(parsedDocument instanceof Error)) {
      return parsedDocument;
    } else return null;
  }
  return null;
};
