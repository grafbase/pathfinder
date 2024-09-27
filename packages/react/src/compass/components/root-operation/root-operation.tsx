import { GraphQLFieldMap } from 'graphql';

import type { AncestorRoot, AncestorsArray } from '../../compass-store';

import { Field } from '../field';

import { rootOperationClass } from './root-operation.css';
import { useVirtualizer } from '@tanstack/react-virtual';
import { useRef } from 'react';

export const RootOperation = ({
  ancestors,
  fields,
}: {
  ancestors: AncestorsArray;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fields: GraphQLFieldMap<any, any> | undefined;
}) => {
  const parentRef = useRef<HTMLDivElement>(null);
  const { operationDefinition, operationType } = ancestors[
    ancestors.length - 1
  ] as AncestorRoot;

  const fieldsSorted = Object.keys(fields ?? {}).sort();

  const count = fieldsSorted.length;
  const virtualizer = useVirtualizer({
    count,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 22,
  });

  if (!fields) {
    return (
      <p>
        {`The active schema doesn’t provide a ${operationType} root operation
        type.`}
      </p>
    );
  }

  const items = virtualizer.getVirtualItems();

  return (
    <div ref={parentRef} className={rootOperationClass}>
      <div
        style={{
          height: virtualizer.getTotalSize(),
          width: '100%',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            transform: `translateY(${items[0]?.start ?? 0}px)`,
          }}
        >
          {items.map((virtualRow) => {
            const fieldKey = fieldsSorted[virtualRow.index];

            return (
              <div
                key={virtualRow.key}
                data-index={virtualRow.index}
                ref={virtualizer.measureElement}
              >
                <Field
                  key={virtualRow.key}
                  ancestors={[
                    ...ancestors,
                    {
                      type: 'FIELD',
                      field: fields[fieldKey],
                      selection:
                        operationDefinition?.selectionSet?.selections.find((s) =>
                          'name' in s ? s.name.value === fields[fieldKey].name : false,
                        ) || null,
                    },
                  ]}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
