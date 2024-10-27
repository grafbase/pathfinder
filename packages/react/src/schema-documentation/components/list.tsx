import { useMemo, useRef, useState } from 'react';
import type { GraphQLDirective, GraphQLField, GraphQLNamedType } from 'graphql';

import { useVirtualizer } from '@tanstack/react-virtual';
import fuzzysort from 'fuzzysort';
import { notificationClass } from '../shared.styles.css';
import { listClasses } from './list.css';
import { PaneItem } from './pane-item';

export const List = ({
  items,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  items: GraphQLNamedType[] | readonly GraphQLDirective[] | GraphQLField<any, any>[];
}) => {
  const parentRef = useRef<HTMLDivElement>(null);

  const [searchValue] = useState('');

  const listSearchable = useMemo(() => {
    return items.map((item) => ({
      item,
      searchTarget: fuzzysort.prepare(item.name),
    }));
  }, [items]);

  const listFilteredBySearch = useMemo(() => {
    if (!searchValue) return items;

    const results = fuzzysort
      .go(searchValue, listSearchable, {
        threshold: 0.4,
        limit: 20,
        key: 'searchTarget',
      })
      .map((res) => res.obj.item) as typeof items;

    return results;
  }, [items, listSearchable, searchValue]);

  const count = listFilteredBySearch.length;
  const virtualizer = useVirtualizer({
    count,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 22,
  });

  const virtualItems = virtualizer.getVirtualItems();

  return (
    <div
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        gap: 24,
      }}
    >
      {/* <div className={secondaryPaneListClasses.searchContainer}>
          <div className={secondaryPaneListClasses.searchInputWrapper}>
            <Icon name="MagnifingGlass" size="small" />
            <input
              type="text"
              name="search"
              placeholder="Search"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className={secondaryPaneListClasses.searchInput}
            />
          </div>
        </div> */}
      {listSearchable.length === 0 && (
        <p className={notificationClass}>{`This schema does not contain `}</p>
      )}
      {listSearchable.length > 0 && (
        <div ref={parentRef} className={listClasses.fieldsListContainer}>
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
                transform: `translateY(${(virtualItems[0]?.start ?? 0) - virtualizer.options.scrollMargin}px)`,
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
              }}
            >
              {virtualItems.map((virtualRow) => {
                const x = listFilteredBySearch[virtualRow.index];

                return (
                  <div
                    key={virtualRow.key}
                    data-index={virtualRow.index}
                    ref={virtualizer.measureElement}
                  >
                    <PaneItem key={x.name} resetTertiaryPaneOnClick={true} item={x} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
