import { useEffect } from 'react';

import { RESPONSE_EDITOR_ID, RESPONSE_MODEL_NAME } from '@pathfinder-ide/shared';
import {
  getMonacoEditor,
  pushMonacoEditorEdit,
  useSchemaStore,
  useSessionStore,
} from '@pathfinder-ide/stores';

import { Editor } from '../editor';

import { KBD } from '../kbd';

import {
  analyzeClass,
  latestResponseClass,
  responseEditorClass,
  responseNullStateClass,
} from './analyze.css';
import { ActionsBar } from '../actions-bar';

export const Analyze = () => {
  const isExecuting = useSchemaStore.use.isExecuting();

  const activeTab = useSessionStore.use.activeTab();

  useEffect(() => {
    const latestResponse = activeTab?.latestResponse;

    if (latestResponse) {
      const value = JSON.stringify(latestResponse.response.data, null, 2);

      const responseEditor = getMonacoEditor({
        editorId: RESPONSE_EDITOR_ID,
      });

      // this check prevents the push edit if the latest execution response is the same value as what's already in the response editor
      // this is critical because, otherwise, we'd be overwriting the editor value every time the cursor position changes in the document editor
      if (responseEditor && value !== (responseEditor && responseEditor.getValue())) {
        pushMonacoEditorEdit({
          edits: [
            {
              range: 'REPLACE',
              text: value,
            },
          ],
          position: { column: 0, lineNumber: 0 },
          targetEditorId: RESPONSE_EDITOR_ID,
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]);

  const duration = activeTab?.latestResponse?.duration
    ? `${Math.round(activeTab?.latestResponse?.duration)}ms`
    : '--';

  return (
    <div className={analyzeClass}>
      <ActionsBar
        actions={[
          <div className={latestResponseClass}>
            <span>{duration}</span>
          </div>,
        ]}
        title="Response"
      />
      {!activeTab && (
        <div className={responseNullStateClass}>awaiting executable operation</div>
      )}

      {activeTab && !activeTab.latestResponse && (
        <div className={responseNullStateClass}>
          <span>Execute operation</span>
          <KBD shortcut="COMMAND_CONTROL" />+
          <KBD shortcut="RETURN" />
        </div>
      )}

      <div
        className={responseEditorClass({
          isExecuting,
          hideResponseEditor: !activeTab || !activeTab.latestResponse,
        })}
      >
        <Editor
          editorId={RESPONSE_EDITOR_ID}
          defaultValue={JSON.stringify(activeTab?.latestResponse?.response.data, null, 2)}
          modelDetails={{
            fileName: RESPONSE_MODEL_NAME,
            language: 'json',
          }}
          monacoOptionOverrides={{
            lineNumbers: 'off',
            readOnly: true,
          }}
        />
      </div>
    </div>
  );
};
