import type {
  GraphQLDirective,
  GraphQLField,
  GraphQLInputField,
  GraphQLNamedType,
} from 'graphql';

import { unwrapType } from '@pathfinder-ide/shared';

import { useSchemaDocumentationStore } from './../store';

import { ArgumentsList } from './arguments-list';
import { DefaultValue } from './default-value';
import { Delimiter } from './delimiter';
import { Markdown } from './markdown';

import { listItemFieldClass, listItemTypeClass } from './list-item.css';
import {
  tertiaryTriggerButtonClass,
  returnTypeButtonClass,
  scalarArgumentNameClass,
} from '../shared.styles.css';

export const ListItemField = ({
  field,
  resetTertiaryPaneOnClick,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  field: GraphQLField<any, any, any>;
  resetTertiaryPaneOnClick: boolean;
}) => {
  const { setActiveTertiaryPane } = useSchemaDocumentationStore.getState();

  return (
    <div className={listItemFieldClass}>
      <button
        className={tertiaryTriggerButtonClass({
          color: 'VIOLET',
        })}
        onClick={() =>
          setActiveTertiaryPane({
            destinationPane: field,
            reset: resetTertiaryPaneOnClick,
          })
        }
      >
        {field.name}
      </button>
      {'args' in field && field.args.length > 0 && (
        <>
          <Delimiter value="(" spacing="LEFT_AND_RIGHT" />
          <ArgumentsList
            args={field.args}
            resetTertiaryPaneOnClick={resetTertiaryPaneOnClick}
          />
          <Delimiter value=")" spacing="LEFT_AND_RIGHT" />
        </>
      )}
      <Delimiter value=":" spacing="LEFT_AND_RIGHT" />
      <button
        className={returnTypeButtonClass}
        onClick={() =>
          setActiveTertiaryPane({
            destinationPane: unwrapType(field.type),
            reset: resetTertiaryPaneOnClick,
          })
        }
      >
        {field.type.toString()}
      </button>
    </div>
  );
};

export const ListItemInputField = ({ inputField }: { inputField: GraphQLInputField }) => {
  const { setActiveTertiaryPane } = useSchemaDocumentationStore.getState();

  return (
    <div>
      <span className={scalarArgumentNameClass}>{inputField.name}</span>
      <Delimiter value=":" spacing="LEFT_AND_RIGHT" />
      <button
        className={returnTypeButtonClass}
        title="Return type"
        onClick={() =>
          setActiveTertiaryPane({
            destinationPane: unwrapType(inputField.type),
          })
        }
      >
        {inputField.type.toString()}
      </button>
      <DefaultValue inputFieldOrArgument={inputField} />
      {inputField.description && <Markdown content={inputField.description} />}
    </div>
  );
};

export const ListItemType = ({
  resetTertiaryPaneOnClick,
  showDescription,
  type,
}: {
  resetTertiaryPaneOnClick: boolean;
  showDescription: boolean;
  type: GraphQLNamedType | GraphQLDirective;
}) => {
  const { setActiveTertiaryPane } = useSchemaDocumentationStore.getState();

  return (
    <div className={listItemTypeClass}>
      <button
        className={tertiaryTriggerButtonClass({
          color: 'BLUE',
        })}
        onClick={() =>
          setActiveTertiaryPane({
            destinationPane: type,
            reset: resetTertiaryPaneOnClick,
          })
        }
      >
        {type.name}
      </button>
      {showDescription && type.description && <Markdown content={type.description} />}
    </div>
  );
};
