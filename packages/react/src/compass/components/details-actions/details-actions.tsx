import {
  type AncestorTypes,
  type AncestorsArray,
  generateSelectionBreadcrumbsFromAncestors,
  insertNewOperation,
} from '../../compass-store';

import { IconButton } from '../../../components/icon-button';

import { type ListItemTypeTypes } from '../list-item';

import { useSchemaDocumenationStore } from '../../../schema-documentation';

import { detailsActionsClass, detailsActionsControlsClass } from './details-actions.css';

export type DetailsActionsProps = {
  ancestors: AncestorsArray;
  previousAncestor: AncestorTypes;
  showActions: boolean;
  type: ListItemTypeTypes;
};

export const DetailsActions = ({
  ancestors,
  previousAncestor,
  showActions = false,
  type,
}: DetailsActionsProps) => {
  const { setActiveTertiaryPane } = useSchemaDocumenationStore.getState();

  return (
    <div
      className={detailsActionsClass({
        showActions,
      })}
    >
      <div className={detailsActionsControlsClass}>
        <IconButton
          action={() => {
            setActiveTertiaryPane({ destinationPane: type });
          }}
          iconName="Docs"
          title="View Quick Docs"
          size="small"
        />
        {
          // if the previousAncestor is "ROOT", we're on a top-level operation and we want to show the insertNewOperation action
        }
        {previousAncestor.type === 'ROOT' && (
          <IconButton
            action={() =>
              insertNewOperation({
                ancestors,
                range: 'END',
              })
            }
            iconName="InsertNewOperation"
            title={`Insert ${generateSelectionBreadcrumbsFromAncestors({
              ancestors,
            })} as new operation`}
            size="small"
          />
        )}
      </div>
    </div>
  );
};
