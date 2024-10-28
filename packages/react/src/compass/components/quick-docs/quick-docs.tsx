import { DetailsPane, useSchemaDocumentationStore } from '../../../schema-documentation';

import { quickDocsClass } from './quick-docs.css';

export const QuickDocs = () => {
  const activeDetailsPane = useSchemaDocumentationStore.use.activeDetailsPane();

  return (
    <div
      className={quickDocsClass({
        dialogActive: !!activeDetailsPane,
      })}
    >
      {activeDetailsPane && <DetailsPane pane={activeDetailsPane['pane']} />}
    </div>
  );
};
