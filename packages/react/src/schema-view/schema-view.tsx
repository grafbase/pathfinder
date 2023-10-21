import { useEffect } from 'react';
import { GraphQLSchema, printSchema } from 'graphql';

import { getMonacoEditor } from '@pathfinder-ide/stores';

import { Editor } from '../components';

import { schemaViewInnerClass, schemaViewClass } from './schema-view.css';

type SchemaViewProps = {
  schema: GraphQLSchema;
};

export const SchemaView = ({ schema }: SchemaViewProps) => {
  useEffect(() => {
    const schemaViewEditor = getMonacoEditor({
      editorId: 'schema-view-editor',
    });
    schemaViewEditor?.setValue(printSchema(schema));
  }, [schema]);

  if (!schema) {
    return null;
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
