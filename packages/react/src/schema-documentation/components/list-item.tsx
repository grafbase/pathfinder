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
  detailsTriggerButtonClass,
  returnTypeButtonClass,
  scalarArgumentNameClass,
} from '../shared.styles.css';

export const ListItemField = ({
  field,
  resetDetailsPaneOnClick,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  field: GraphQLField<any, any, any>;
  resetDetailsPaneOnClick: boolean;
}) => {
  const { setActiveDetailsPane } = useSchemaDocumentationStore.getState();

  return (
    <div className={listItemFieldClass}>
      <button
        className={detailsTriggerButtonClass({
          color: 'VIOLET',
        })}
        onClick={() =>
          setActiveDetailsPane({
            destinationPane: field,
            reset: resetDetailsPaneOnClick,
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
            resetDetailsPaneOnClick={resetDetailsPaneOnClick}
          />
          <Delimiter value=")" spacing="LEFT_AND_RIGHT" />
        </>
      )}
      <Delimiter value=":" spacing="LEFT_AND_RIGHT" />
      <button
        className={returnTypeButtonClass}
        onClick={() =>
          setActiveDetailsPane({
            destinationPane: unwrapType(field.type),
            reset: resetDetailsPaneOnClick,
          })
        }
      >
        {field.type.toString()}
      </button>
    </div>
  );
};

export const ListItemInputField = ({ inputField }: { inputField: GraphQLInputField }) => {
  const { setActiveDetailsPane } = useSchemaDocumentationStore.getState();

  return (
    <div className={listItemFieldClass}>
      <span className={scalarArgumentNameClass}>{inputField.name}</span>
      <Delimiter value=":" spacing="LEFT_AND_RIGHT" />
      <button
        className={returnTypeButtonClass}
        title="Return type"
        onClick={() =>
          setActiveDetailsPane({
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
  resetDetailsPaneOnClick,
  showDescription,
  type,
}: {
  resetDetailsPaneOnClick: boolean;
  showDescription: boolean;
  type: GraphQLNamedType | GraphQLDirective;
}) => {
  const { setActiveDetailsPane } = useSchemaDocumentationStore.getState();

  return (
    <div className={listItemTypeClass}>
      <button
        className={detailsTriggerButtonClass({
          color: 'BLUE',
        })}
        onClick={() =>
          setActiveDetailsPane({
            destinationPane: type,
            reset: resetDetailsPaneOnClick,
          })
        }
      >
        {type.name}
      </button>
      {showDescription && type.description && <Markdown content={type.description} />}
    </div>
  );
};
