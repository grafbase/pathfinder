import { DOCUMENT_EDITOR_ID, DOCUMENT_MODEL_NAME } from '@pathfinder-ide/shared';

import {
  runExecuteOperation,
  setDocumentState,
  updateEditorTab,
  useGraphQLDocumentStore,
  useSessionStore,
} from '@pathfinder-ide/stores';

import { ActionExecute } from '../action-execute';
import { ActionPrettier } from '../action-prettier';
import { ActionsBar } from '../actions-bar';
import { DocumentNotification } from '../document-notification';
import { Editor } from '../editor';

import { documentEditorWrapClass, operateClass, separatorClass } from './operate.css';

export const Operate = () => {
  const documentNotifications = useGraphQLDocumentStore.use.documentNotifications();

  const activeTab = useSessionStore.use.activeTab();

  if (!activeTab) {
    return <p>no activeTab</p>;
  }

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
          defaultValue={activeTab.documentString}
          editorId={DOCUMENT_EDITOR_ID}
          initialCursorPosition={activeTab.cursorPosition || undefined}
          modelDetails={{
            fileName: DOCUMENT_MODEL_NAME,
            language: 'graphql',
          }}
          onDidChangeCursorPositionCallback={({ position }) => {
            setDocumentState();
            updateEditorTab({
              partialTab: {
                cursorPosition: position,
              },
            });
          }}
        />
      </div>
    </div>
  );
};
