import { GraphQLArgument, isInputObjectType } from 'graphql';

import { unwrapType } from '@pathfinder-ide/shared';

import { useSchemaDocumentationStore } from '../../store';

import { DefaultValue } from '../default-value';
import { Delimiter } from '../delimiter';
import { Markdown } from '../markdown';

import { argumentClass, argumentListClass, inputObjectName } from './arguments-list.css';

import { returnTypeButtonClass, scalarArgumentNameClass } from '../../shared.styles.css';

export const ArgumentsList = ({
  args,
  resetDetailsPaneOnClick,
  showBorder = false,
  showDescription = false,
}: {
  args: readonly GraphQLArgument[];
  resetDetailsPaneOnClick: boolean;
  showBorder?: boolean;
  showDescription?: boolean;
}) => {
  const { setActiveDetailsPane } = useSchemaDocumentationStore.getState();

  if (args.length < 1) {
    return null;
  } else {
    return (
      <div className={argumentListClass}>
        {args.map((a) => (
          <div
            className={argumentClass({
              showBorder,
              showDescription,
            })}
            key={a.name}
          >
            <div>
              {isInputObjectType(a.type) ? (
                <span className={inputObjectName}>{a.name}</span>
              ) : (
                <span className={scalarArgumentNameClass}>{a.name}</span>
              )}
              <Delimiter value=":" spacing="LEFT_AND_RIGHT" />
              <button
                className={returnTypeButtonClass}
                onClick={() =>
                  setActiveDetailsPane({
                    destinationPane: unwrapType(a.type),
                    reset: resetDetailsPaneOnClick,
                  })
                }
              >
                {a.type.toString()}
              </button>
              <DefaultValue inputFieldOrArgument={a} />
            </div>
            {showDescription && a.description && <Markdown content={a.description} />}
          </div>
        ))}
      </div>
    );
  }
};
