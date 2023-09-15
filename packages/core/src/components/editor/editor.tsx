import { useEffect, useRef } from "react";

import {
  createMonacoEditor,
  disposeMonacoEditor,
  setDocumentState,
  useMonacoEditorStore,
} from "@pathfinder/stores";

import { editorClass } from "./editor.css";
import type { EditorProps } from "./editor.types";

import "./workers";

export const Editor = ({
  actions,
  defaultValue,
  editorId,
  initialCursorPosition,
  modelDetails,
  monacoOptionOverrides,
  onDidChangeCursorPositionCallback,
}: EditorProps) => {
  const editorRef = useRef<HTMLDivElement>(null);

  const isInitialized = useMonacoEditorStore.use.isInitialized();

  const modelName = `${modelDetails.fileName}.${modelDetails.language}`;

  useEffect(() => {
    const create = async () => {
      const editor = await createMonacoEditor({
        defaultValue: defaultValue || undefined,
        editorId,
        initialModelName: modelName,
        monacoOptionOverrides: monacoOptionOverrides || undefined,
        ref: editorRef.current as HTMLDivElement,
      });

      if (editor && onDidChangeCursorPositionCallback) {
        editor.onDidChangeCursorPosition((e) => {
          onDidChangeCursorPositionCallback({
            editorValue: editor.getValue(),
            position: e.position,
          });
        });
      }

      if (editor && initialCursorPosition) {
        editor.setPosition(initialCursorPosition);
        setDocumentState();
        setTimeout(() => {
          editor.focus();
        }, 150);
      }

      if (editor && actions) {
        actions.forEach((action) => {
          editor.addAction(action);
        });
      }
    };

    create();

    return () => {
      disposeMonacoEditor({ editorId });
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={editorRef}
      data-testid={modelName}
      className={editorClass({
        isInitialized,
      })}
    />
  );
};
