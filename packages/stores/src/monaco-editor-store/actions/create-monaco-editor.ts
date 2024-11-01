import {
  DOCUMENT_EDITOR_ID,
  RESPONSE_EDITOR_ID,
  VARIABLES_EDITOR_ID,
} from '@pathfinder-ide/shared';

import type {
  MonacoEditorStoreActions,
  MonacoEditorITextModel,
} from '../monaco-editor-store.types';

import { editorOptions } from '../helpers/editor-options';

import { monacoEditorStore } from '../../monaco-editor-store';

import { getMonacoEditor } from './get-monaco-editor';

import { initializeMonacoEditor } from './initialize-monaco-editor';
import { importMonaco } from './monaco-import';

export const createMonacoEditor: MonacoEditorStoreActions['createMonacoEditor'] = async ({
  defaultValue,
  editorId,
  initialModelName,
  monacoOptionOverrides,
  ref,
}) => {
  const { editor, Uri } = await importMonaco();

  // initialize if necessary
  if (!monacoEditorStore.getState().isInitialized) {
    initializeMonacoEditor();
  }

  // pop the language from our complete uri for use in editor.create
  const language = initialModelName.split('.').pop();
  let model: MonacoEditorITextModel | null = null;

  const existingEditor = getMonacoEditor({ editorId });

  // return early if this editor has already been created
  // this check is important because react's strict mode will render components _twice_ in rapid succession
  // without this check we'd end up with duplicate editor instances
  if (existingEditor) {
    return null;
  }

  // there may already be a model matching this uri
  // if so, we'll use it during editor creation
  const existingModel = editor.getModel(Uri.file(initialModelName));

  if (!existingModel) {
    const uri = Uri.file(initialModelName);
    model = editor.createModel(defaultValue || '', language, uri);
  }

  const newlyCreatedEditor = editor.create(ref, {
    ...editorOptions,
    ...monacoOptionOverrides,
    language,
    model: existingModel ? existingModel : model,
  });

  if (
    editorId === DOCUMENT_EDITOR_ID ||
    editorId === RESPONSE_EDITOR_ID ||
    editorId === VARIABLES_EDITOR_ID
  ) {
    monacoEditorStore.setState({
      managedEditors: {
        ...monacoEditorStore.getState().managedEditors,
        [editorId]: newlyCreatedEditor,
      },
    });
  } else {
    monacoEditorStore.setState({
      unmanagedEditors: {
        ...monacoEditorStore.getState().unmanagedEditors,
        [editorId]: newlyCreatedEditor,
      },
    });
  }

  return newlyCreatedEditor;
};
