import {
  TertiaryPane,
  useSchemaDocumentation,
} from "../../../schema-documentation";

import { quickDocsClass } from "./quick-docs.css";

export const QuickDocs = () => {
  const { activeTertiaryPane } = useSchemaDocumentation();

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
