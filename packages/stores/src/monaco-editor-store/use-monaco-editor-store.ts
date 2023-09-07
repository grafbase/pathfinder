import { monacoEditorStore } from "./monaco-editor-store";

import { createZustandSelectors } from "@graphql-pathfinder/shared";

export const useMonacoEditorStore = createZustandSelectors(monacoEditorStore);
