import { GraphQLFieldMap, SelectionNode } from 'graphql';

import { type AncestorsArray, findSelection } from '../../compass-store';

import { Field } from '../field';

export const Fields = ({
  ancestors,
  fields,
  parentSelections,
}: {
  ancestors: AncestorsArray;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fields: GraphQLFieldMap<any, any>;
  parentSelections: ReadonlyArray<SelectionNode>;
}) => {
  return (
    <>
      {Object.keys(fields).map((f) => (
        <Field
          key={fields[f].name}
          ancestors={[
            ...ancestors,
            {
              type: 'FIELD',
              field: fields[f],
              selection:
                findSelection({
                  fieldName: fields[f].name,
                  selections: [...parentSelections],
                }) || null,
            },
          ]}
        />
      ))}
    </>
  );
};
