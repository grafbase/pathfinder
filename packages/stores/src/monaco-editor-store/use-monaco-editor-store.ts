import { monacoEditorStore } from './monaco-editor-store';

import { createZustandSelectors } from '@pathfinder-ide/shared';

export const useMonacoEditorStore = createZustandSelectors(monacoEditorStore);
