import { useEffect } from "react";
import { printSchema } from "graphql";

import { getMonacoEditor, useSchemaStore } from "@pathfinder/stores";

import { Editor } from "../components";

import { schemaViewInnerClass, schemaViewClass } from "./schema-view.css";

export const SchemaView = () => {
  const schema = useSchemaStore.use.schema();

  useEffect(() => {
    if (schema) {
      const schemaViewEditor = getMonacoEditor({
        editorId: "schema-view-editor",
      });
      schemaViewEditor?.setValue(printSchema(schema));
    }
  }, [schema]);

  if (!schema) {
    return null;
  }

  return (
    <div className={schemaViewClass}>
      <div className={schemaViewInnerClass}>
        <Editor
          editorId={"schema-view-editor"}
          defaultValue={printSchema(schema)}
          modelDetails={{
            fileName: "schema-view-editor",
            language: "graphql",
          }}
          monacoOptionOverrides={{
            lineNumbers: "off",
            readOnly: true,
          }}
        />
      </div>
    </div>
  );
};
