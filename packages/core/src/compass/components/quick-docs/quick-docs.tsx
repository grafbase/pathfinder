import {
  TertiaryPane,
  useSchemaDocumentationStore,
} from "../../../schema-documentation";

import { quickDocsClass } from "./quick-docs.css";

export const QuickDocs = () => {
  const { activeTertiaryPane } = useSchemaDocumentationStore();

  return (
    <div
      className={quickDocsClass({
        dialogActive: !!activeTertiaryPane,
      })}
    >
      {activeTertiaryPane && <TertiaryPane pane={activeTertiaryPane["pane"]} />}
    </div>
  );
};
