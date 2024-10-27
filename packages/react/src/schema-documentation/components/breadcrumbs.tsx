import { useSchemaDocumentationStore } from '../store';
import { breadcrumbsStyles } from './breadcrumbs.css';

export const Breadcrumbs = () => {
  const activePrimaryPane = useSchemaDocumentationStore.use.activePrimaryPane();
  const tertiaryPaneStack = useSchemaDocumentationStore.use.tertiaryPaneStack();

  return (
    <div className={breadcrumbsStyles.container}>
      <span>Schema</span>
      <span className={breadcrumbsStyles.arrow}>{`->`}</span>
      <span>{activePrimaryPane}</span>
      {tertiaryPaneStack.length > 0 &&
        tertiaryPaneStack.map((stackItem) => (
          <span key={stackItem.hash} className={breadcrumbsStyles.item}>
            <span className={breadcrumbsStyles.arrow}>{`->`}</span>
            {stackItem.pane.name}
          </span>
        ))}
    </div>
  );
};
