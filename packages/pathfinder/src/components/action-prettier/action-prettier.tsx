import { DOCUMENT_EDITOR_ID } from "@graphql-pathfinder/shared";
import { IconButton } from "../icon-button";

import {
  getMonacoEditor,
  useGraphQLDocumentStore,
} from "@graphql-pathfinder/stores";

export const ActionPrettier = () => {
  const isParseable = useGraphQLDocumentStore.use.isParseable();

  return (
    <IconButton
      action={() =>
        getMonacoEditor({ editorId: DOCUMENT_EDITOR_ID })
          ?.getAction("editor.action.formatDocument")
          ?.run()
      }
      iconName="Prettier"
      isDisabled={!isParseable}
      size="medium"
      title={
        isParseable
          ? "Format document editor"
          : `Can't format because document is not parseable`
      }
    />
  );
};
