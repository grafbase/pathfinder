import { useSchemaDocumenationStore } from '../../store';

import { Pill } from '../../../components';

import type { TopLevelPane } from '../../types';

import { typeSystemNavButtonClass } from './type-system-nav-button.css';

export const TypeSystemNavButton = ({
  destinationPane,
  copy,
  count,
}: {
  destinationPane: TopLevelPane;
  copy: string | React.ReactElement;
  count: string;
}) => {
  const { setActivePrimaryPane, clearTertiaryPaneStack } =
    useSchemaDocumenationStore.getState();

  const activePrimaryPane = useSchemaDocumenationStore.use.activePrimaryPane();

  return (
    <button
      className={typeSystemNavButtonClass({
        isActive: activePrimaryPane === destinationPane,
      })}
      onClick={() => {
        setActivePrimaryPane({ destinationPane });
        clearTertiaryPaneStack();
      }}
    >
      {copy}
      <Pill copy={count} variant={{ color: 'yellow' }} />
    </button>
  );
};
