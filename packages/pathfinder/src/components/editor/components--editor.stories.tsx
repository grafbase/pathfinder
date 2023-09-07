import { Editor } from "./editor";

import {
  DOCUMENT_EDITOR_ID,
  VARIABLES_EDITOR_DEFAULT_VALUE,
  VARIABLES_EDITOR_ID,
} from "@graphql-pathfinder/shared";

import { Trailblazer } from "../../trailblazer";

export const GraphQLEditorWithDefaultValue = () => {
  return (
    <Trailblazer
      schemaProps={{
        fetcherOptions: {
          endpoint: "",
        },
      }}
    >
      <Editor
        defaultValue={`query aCoolQuery {  person {  name  } }`}
        editorId={DOCUMENT_EDITOR_ID}
        modelDetails={{
          fileName: "pathfinder-document-editor-with-default-value",
          language: "graphql",
        }}
      />
    </Trailblazer>
  );
};

export const JSONEditorWithDefaultValue = () => {
  return (
    <Editor
      defaultValue={VARIABLES_EDITOR_DEFAULT_VALUE}
      editorId={VARIABLES_EDITOR_ID}
      modelDetails={{
        fileName: "basic-json-example",
        language: "json",
      }}
    />
  );
};
