import { GraphQLFieldMap } from 'graphql';

import type { AncestorRoot, AncestorsArray } from '../../compass-store';

import { Field } from '../field';

import { rootOperationClass } from './root-operation.css';

export const RootOperation = ({
  ancestors,
  fields,
}: {
  ancestors: AncestorsArray;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fields: GraphQLFieldMap<any, any> | undefined;
}) => {
  const { operationDefinition, operationType } = ancestors[
    ancestors.length - 1
  ] as AncestorRoot;

  if (!fields) {
    return (
      <p>
        {`The active schema doesn’t provide a ${operationType} root operation
        type.`}
      </p>
    );
  }

  return (
    <ul className={rootOperationClass}>
      {Object.keys(fields)
        .sort()
        .map((field) => (
          <Field
            key={field}
            ancestors={[
              ...ancestors,
              {
                type: 'FIELD',
                field: fields[field],
                selection:
                  operationDefinition?.selectionSet?.selections.find((s) =>
                    'name' in s ? s.name.value === fields[field].name : false,
                  ) || null,
              },
            ]}
          />
        ))}
    </ul>
  );
};
