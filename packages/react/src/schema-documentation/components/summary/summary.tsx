import type {
  GraphQLDirective,
  GraphQLField,
  GraphQLInputField,
  GraphQLNamedType,
} from 'graphql';

import { unwrapType } from '@pathfinder-ide/shared';

import { useSchemaDocumentationStore } from '../../store';

import { DefaultValue } from '../default-value';
import { Markdown } from '../markdown';

import { summaryTypeClass } from './summary.css';

import {
  returnTypeButtonClass,
  scalarArgumentNameClass,
  listButtonStyles,
} from '../../shared.styles.css';

import { Delimiter } from '../delimiter';
import { Icon } from '../../../components';

export const SummaryField = ({
  field,
  resetTertiaryPaneOnClick,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  field: GraphQLField<any, any, any>;
  resetTertiaryPaneOnClick: boolean;
}) => {
  const { setActiveTertiaryPane } = useSchemaDocumentationStore.getState();

  return (
    <button
      className={listButtonStyles.container({
        color: 'NEUTRAL',
      })}
      onClick={() =>
        setActiveTertiaryPane({
          destinationPane: field,
          reset: resetTertiaryPaneOnClick,
        })
      }
    >
      <div>
        {field.name}({field.args.length}): {field.type.toString()}
      </div>
      <div className={listButtonStyles.icon}>
        <Icon name="Chevron" />
      </div>
    </button>
  );
};

export const SummaryInputField = ({ inputField }: { inputField: GraphQLInputField }) => {
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

export const SummaryType = ({
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
    <div className={summaryTypeClass}>
      <button
        className={listButtonStyles.container({
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
