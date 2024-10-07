import { GraphQLFieldMap } from 'graphql';

import type { AncestorRoot, AncestorsArray } from '../../compass-store';

import { Field } from '../field';

import { rootOperationStyles } from './root-operation.css';
import { useVirtualizer } from '@tanstack/react-virtual';
import { useMemo, useRef, useState } from 'react';
import fuzzysort from 'fuzzysort';

export const RootOperation = ({
  ancestors,
  fields,
}: {
  ancestors: AncestorsArray;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fields: GraphQLFieldMap<any, any> | undefined;
}) => {
  const parentRef = useRef<HTMLDivElement>(null);

  const [searchValue] = useState('');

  const allFields = useMemo(() => {
    return Object.keys(fields ?? {})
      .sort()
      .map((fieldKey) => ({
        fieldKey,
        searchTarget: fuzzysort.prepare(fieldKey),
      }));
  }, [fields]);

  const fieldsFilteredBySearch = useMemo(() => {
    if (!searchValue) return allFields.map((f) => f.fieldKey);

    const results = fuzzysort
      .go(searchValue, allFields, {
        threshold: 0.4,
        limit: 20,
        key: 'searchTarget',
      })
      .map((res) => res.obj.fieldKey);

    return results;
  }, [allFields, searchValue]);

  const count = fieldsFilteredBySearch.length;
  const virtualizer = useVirtualizer({
    count,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 22,
  });

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

  const virtualItems = virtualizer.getVirtualItems();

  return (
    <div className={rootOperationStyles.container}>
      {/* <div className={rootOperationStyles.searchContainer}>
        <div className={rootOperationStyles.searchInputWrapper}>
          <Icon name="MagnifingGlass" size="small" />
          <input
            type="text"
            name="search"
            placeholder="Search"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className={rootOperationStyles.searchInput}
          />
        </div>
      </div> */}
      <div ref={parentRef} className={rootOperationStyles.operationsListContainer}>
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
              transform: `translateY(${virtualItems[0]?.start ?? 0}px)`,
            }}
          >
            {virtualItems.map((virtualRow) => {
              const fieldKey = fieldsFilteredBySearch[virtualRow.index];

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
    </div>
  );
};
