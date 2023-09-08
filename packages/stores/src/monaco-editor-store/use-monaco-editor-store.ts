import { monacoEditorStore } from "./monaco-editor-store";

import { createZustandSelectors } from "@pathfinder/shared";

export const useMonacoEditorStore = createZustandSelectors(monacoEditorStore);
