import { useState } from 'react';

import { FieldNode } from 'graphql';

import {
  type AncestorField,
  type AncestorsArray,
  generateSelectionBreadcrumbsFromAncestors,
} from '../../compass-store';

import { Argument } from '../argument';
import { Icon } from '../../../components';

import {
  argumentsCollapseTriggerClass,
  argumentsClass,
  argumentsContentClass,
  argumentsListClass,
} from './arguments.css';

export const Arguments = ({
  ancestors,
  selection,
}: {
  ancestors: AncestorsArray;
  selection: FieldNode | null;
}) => {
  const { field } = ancestors[ancestors.length - 1] as AncestorField;

  const { args } = field;

  // TODO: can we use a ref here to ensure the isExpanded state doesn't reset on each render?
  const [isExpanded, setIsExpanded] = useState<boolean>(
    (selection?.arguments && selection?.arguments.length > 0) || false,
  );

  return (
    <div className={argumentsClass({ isExpanded })}>
      <button
        className={argumentsCollapseTriggerClass}
        onClick={() => {
          setIsExpanded(!isExpanded);
        }}
        title={`Expand nested content of ${generateSelectionBreadcrumbsFromAncestors({
          ancestors,
        })} ARGUMENTS`}
      >
        <Icon name={'Caret'} rotate={isExpanded ? '90' : undefined} size="small" />
        ARGUMENTS
      </button>
      <div className={argumentsContentClass}>
        {isExpanded && (
          <ul className={argumentsListClass}>
            {args.map((arg) => (
              <Argument
                key={arg.name}
                ancestors={[
                  ...ancestors,
                  {
                    type: 'ARGUMENT',
                    argument: arg,
                    selection: selection?.arguments?.find(
                      (a) => a.name.value === arg.name,
                    ),
                  },
                ]}
              />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
