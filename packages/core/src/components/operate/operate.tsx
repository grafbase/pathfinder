import { DOCUMENT_EDITOR_ID, DOCUMENT_MODEL_NAME } from "@pathfinder/shared";

import {
  graphQLDocumentStore,
  runExecuteOperation,
  setDocumentState,
  useGraphQLDocumentStore,
} from "@pathfinder/stores";

import { ActionExecute } from "../action-execute";
import { ActionPrettier } from "../action-prettier";
import { ActionsBar } from "../actions-bar";
import { DocumentNotification } from "../document-notification";
import { Editor } from "../editor";

import {
  documentEditorWrapClass,
  operateClass,
  separatorClass,
} from "./operate.css";

export const Operate = () => {
  const documentNotifications =
    useGraphQLDocumentStore.use.documentNotifications();

  return (
    <div className={operateClass}>
      <ActionsBar
        actions={[
          <ActionPrettier />,
          <div className={separatorClass} />,
          <ActionExecute />,
        ]}
        title="Document"
      />
      {documentNotifications.length > 0 &&
        Array.from(documentNotifications).map((dW, i) => (
          <DocumentNotification key={`${dW} + ${i}`} notificationType={dW} />
        ))}
      <div className={documentEditorWrapClass}>
        <Editor
          actions={[runExecuteOperation]}
          defaultValue={
            graphQLDocumentStore.getState().documentString ||
            `no value to restore from previous session`
          }
          editorId={DOCUMENT_EDITOR_ID}
          initialCursorPosition={
            graphQLDocumentStore.getState().cursorPosition || undefined
          }
          modelDetails={{
            fileName: DOCUMENT_MODEL_NAME,
            language: "graphql",
          }}
          onDidChangeCursorPositionCallback={({ position }) => {
            setDocumentState();
            graphQLDocumentStore.setState({
              cursorPosition: position,
            });
          }}
        />
      </div>
    </div>
  );
};
