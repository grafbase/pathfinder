import { printSchema } from "graphql";

import { useSchemaStore } from "@pathfinder/stores";

import { Editor } from "../components";

import {
  pluginSchemaAwareSchemaViewInnerClass,
  pluginSchemaAwareSchemaViewClass,
} from "./plugin-schema-aware-schema-view.css";

export const PluginSchemaAwareSchemaView = () => {
  const schema = useSchemaStore.use.schema();

  if (!schema) {
    return null;
  }

  return (
    <div className={pluginSchemaAwareSchemaViewClass}>
      <div className={pluginSchemaAwareSchemaViewInnerClass}>
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
