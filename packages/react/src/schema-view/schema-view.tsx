import { useEffect } from 'react';
import { printSchema } from 'graphql';

import { getMonacoEditor, initializeTheme } from '@pathfinder-ide/stores';

import { Editor, LoadingSchema } from '../components';

import { schemaViewInnerClass, schemaViewClass } from './schema-view.css';
import { SharedComponentProps } from '../types';

export const SchemaView = ({ schema, themeOptions }: SharedComponentProps) => {
  useEffect(() => {
    if (schema) {
      const schemaViewEditor = getMonacoEditor({
        editorId: 'schema-view-editor',
      });
      schemaViewEditor?.setValue(printSchema(schema));
    }
  }, [schema]);

  useEffect(() => {
    // set the theme and handle overrides if provided
    initializeTheme({ options: themeOptions });
  });

  if (!schema) {
    return <LoadingSchema />;
  }

  return (
    <div className={schemaViewClass}>
      <div className={schemaViewInnerClass}>
        <Editor
          editorId={'schema-view-editor'}
          defaultValue={printSchema(schema)}
          modelDetails={{
            fileName: 'schema-view-editor',
            language: 'graphql',
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
