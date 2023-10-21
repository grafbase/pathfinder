import { useSchemaDocumentationStore } from '../../store';

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
  const { activePrimaryPane, setActivePrimaryPane, clearTertiaryPaneStack } =
    useSchemaDocumentationStore();

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
