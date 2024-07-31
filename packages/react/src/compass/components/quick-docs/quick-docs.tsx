import { TertiaryPane, useSchemaDocumenationStore } from '../../../schema-documentation';

import { quickDocsClass } from './quick-docs.css';

export const QuickDocs = () => {
  const activeTertiaryPane = useSchemaDocumenationStore.use.activeTertiaryPane();

  return (
    <div
      className={quickDocsClass({
        dialogActive: !!activeTertiaryPane,
      })}
    >
      {activeTertiaryPane && <TertiaryPane pane={activeTertiaryPane['pane']} />}
    </div>
  );
};
