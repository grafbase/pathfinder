import { useSchemaDocumentationStore } from '../store';
import { List } from './list';
import { panesStyles } from './panes.css';

export const Panes = () => {
  const panes = useSchemaDocumentationStore.use.panes();

  return (
    <div className={panesStyles.container}>
      {panes.map((pane, i) => (
        <List key={`${pane.name}-${i}`} index={i} propItems={pane.pane} />
      ))}
    </div>
  );
};
