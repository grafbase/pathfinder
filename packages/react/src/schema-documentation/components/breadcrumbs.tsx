import { Icon } from '../../components';
import { useSchemaDocumentationStore } from '../store';
import { breadcrumbsStyles } from './breadcrumbs.css';

export const Breadcrumbs = () => {
  const panes = useSchemaDocumentationStore.use.panes();
  const { navigatePanes } = useSchemaDocumentationStore.getState();

  return (
    <div className={breadcrumbsStyles.container}>
      <span>Schema</span>
      {panes.length > 0 &&
        panes.map((pane, i) => (
          <button
            key={pane.name}
            className={breadcrumbsStyles.button}
            onClick={() => navigatePanes({ index: i })}
          >
            <Icon name="ArrowRight" size="medium" />
            {pane.name}
          </button>
        ))}
    </div>
  );
};
