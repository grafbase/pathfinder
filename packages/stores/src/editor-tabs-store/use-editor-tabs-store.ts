import { editorTabsStore } from "./editor-tabs-store";

import { createZustandSelectors } from "@pathfinder/shared";

export const useEditorTabsStore = createZustandSelectors(editorTabsStore);
