import { OperationTypeNode } from 'graphql';
import { DOCUMENT_EDITOR_ID, DOCUMENT_MODEL_NAME } from '@pathfinder-ide/shared';

import {
  runExecuteOperation,
  setDocumentState,
  updateEditorTab,
  useGraphQLDocumentStore,
  useSessionStore,
} from '@pathfinder-ide/stores';

import { ActionExecute } from '../action-execute';
import { ActionExecuteSubscription } from '../action-execute-subscription';
import { ActionPrettier } from '../action-prettier';
import { ActionsBar } from '../actions-bar';
import { DocumentNotification } from '../document-notification';
import { Editor } from '../editor';

import { documentEditorWrapClass, operateClass, separatorClass } from './operate.css';

export const Operate = () => {
  const documentNotifications = useGraphQLDocumentStore.use.documentNotifications();

  const activeTab = useSessionStore.use.activeTab();

  const activeDocumentEntry = useGraphQLDocumentStore.use.activeDocumentEntry();

  if (!activeTab) {
    return null;
  }

  return (
    <div className={operateClass}>
      <ActionsBar
        actions={[
          <ActionPrettier />,
          <div className={separatorClass} />,
          activeDocumentEntry?.node.operation === OperationTypeNode.SUBSCRIPTION ? (
            <ActionExecuteSubscription />
          ) : (
            <ActionExecute />
          ),
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
