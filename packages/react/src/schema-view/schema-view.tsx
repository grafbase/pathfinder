import { useEffect } from 'react';

import { getMonacoEditor, initializeTheme } from '@pathfinder-ide/stores';

import { Editor, LoadingSchema } from '../components';

import { schemaViewInnerClass, schemaViewClass } from './schema-view.css';

import type { ThemeOptions } from '@pathfinder-ide/stores';

type SchemaViewProps = {
  schemaString?: string;
  themeOptions?: Partial<ThemeOptions>;
};

export const SchemaView = ({ schemaString, themeOptions }: SchemaViewProps) => {
  useEffect(() => {
    if (schemaString) {
      const schemaViewEditor = getMonacoEditor({
        editorId: 'schema-view-editor',
      });
      schemaViewEditor?.setValue(schemaString);
    }
  }, [schemaString]);

  useEffect(() => {
    // set the theme and handle overrides if provided
    initializeTheme({ options: themeOptions });
  });

  if (!schemaString) {
    return <LoadingSchema />;
  }

  return (
    <div className={schemaViewClass}>
      <div className={schemaViewInnerClass}>
        <Editor
          editorId={'schema-view-editor'}
          defaultValue={schemaString}
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
