import { useSchemaDocumentationStore } from '../../store';

import { Pill } from '../../../components';

import { typeSystemNavButtonClass } from './type-system-nav-button.css';
import { PaneItem } from '../../store/schema-documentation-store.types';

export const TypeSystemNavButton = ({
  pane,
  count,
}: {
  pane: PaneItem;
  count: string;
}) => {
  const { clearDetailsPaneStack, clearPaneStack, navigatePanes } =
    useSchemaDocumentationStore.getState();

  const leadPane = useSchemaDocumentationStore.use.panes();

  return (
    <button
      className={typeSystemNavButtonClass({
        isActive: leadPane[0] ? leadPane[0].name === pane.name : false,
      })}
      onClick={() => {
        clearPaneStack(), clearDetailsPaneStack();
        navigatePanes({ index: 0, pane });
      }}
    >
      {pane.name}
      <Pill copy={count} variant={{ color: 'neutral' }} />
    </button>
  );
};
