import { useMemo, useRef, useState, type ReactElement } from 'react';
import type { GraphQLDirective, GraphQLNamedType, GraphQLObjectType } from 'graphql';

import { useSchemaDocumentationStore } from '../../store';

import { SortedTypeMap } from '../../types';

import { Section, SectionDescription, SectionFields } from '../section';
import { SummaryType } from '../summary';
import { Markdown } from '../markdown';

import { secondaryPaneClass, secondaryPaneListClasses } from './secondary-pane.css';
import { notificationClass } from '../../shared.styles.css';
import { useVirtualizer } from '@tanstack/react-virtual';
import { Icon } from '../../../components';
import fuzzysort from 'fuzzysort';

const List = ({
  list,
  name,
  showDescription = true,
}: {
  list: GraphQLNamedType[] | readonly GraphQLDirective[];
  name: string;
  showDescription?: boolean;
}) => {
  const parentRef = useRef<HTMLDivElement>(null);

  const [searchValue, setSearchValue] = useState('');

  const listSearchable = useMemo(() => {
    return list.map((item) => ({
      item,
      searchTarget: fuzzysort.prepare(item.name),
    }));
  }, [list]);

  const listFilteredBySearch = useMemo(() => {
    if (!searchValue) return list;

    const results = fuzzysort
      .go(searchValue, listSearchable, {
        threshold: 0.4,
        limit: 20,
        key: 'searchTarget',
      })
      .map((res) => res.obj.item) as typeof list;

    return results;
  }, [list, listSearchable, searchValue]);

  const count = listFilteredBySearch.length;
  const virtualizer = useVirtualizer({
    count,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 22,
  });

  const items = virtualizer.getVirtualItems();

  return (
    <Section lead={name} className={secondaryPaneListClasses.container}>
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
          <p className={notificationClass}>{`This schema does not contain ${name}`}</p>
        )}
        {listSearchable.length > 0 && (
          <div ref={parentRef} className={secondaryPaneListClasses.fieldsListContainer}>
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
                  transform: `translateY(${(items[0]?.start ?? 0) - virtualizer.options.scrollMargin}px)`,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 8,
                }}
              >
                {items.map((virtualRow) => {
                  const x = listFilteredBySearch[virtualRow.index];

                  return (
                    <div
                      key={virtualRow.key}
                      data-index={virtualRow.index}
                      ref={virtualizer.measureElement}
                    >
                      <SummaryType
                        key={x.name}
                        resetTertiaryPaneOnClick={true}
                        showDescription={showDescription}
                        type={x}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </Section>
  );
};

const RootOperationDetails = ({
  rootOperationType,
}: {
  rootOperationType: GraphQLObjectType;
}) => {
  const fields = rootOperationType.getFields();

  return (
    <>
      <Section lead="Root Type Name">
        <Markdown content={rootOperationType.name} />
      </Section>
      <SectionDescription description={rootOperationType.description} />
      <SectionFields
        fields={fields}
        parentType={rootOperationType}
        resetTertiaryPaneOnClick={true}
      />
    </>
  );
};

export const SecondaryPane = ({
  directives,
  queryRootType,
  mutationRootType,
  subscriptionRootType,
  sortedTypes,
}: {
  directives: readonly GraphQLDirective[];
  queryRootType: GraphQLObjectType | null;
  mutationRootType: GraphQLObjectType | null;
  subscriptionRootType: GraphQLObjectType | null;
  sortedTypes: SortedTypeMap;
}) => {
  const activePrimaryPane = useSchemaDocumentationStore.use.activePrimaryPane();
  const activeTertiaryPane = useSchemaDocumentationStore.use.activeTertiaryPane();

  let toRender: ReactElement = <></>;

  if (activePrimaryPane === 'Query' && queryRootType) {
    toRender = <RootOperationDetails rootOperationType={queryRootType} />;
  }

  if (activePrimaryPane === 'Mutation' && mutationRootType) {
    toRender = <RootOperationDetails rootOperationType={mutationRootType} />;
  }

  if (activePrimaryPane === 'Subscription' && subscriptionRootType) {
    toRender = <RootOperationDetails rootOperationType={subscriptionRootType} />;
  }

  if (activePrimaryPane === 'Directives') {
    toRender = <List list={directives} name={'Directives'} />;
  }

  if (activePrimaryPane === 'Enums') {
    toRender = <List list={sortedTypes['Enums']} name={'Enums'} />;
  }

  if (activePrimaryPane === 'Input Objects') {
    toRender = <List list={sortedTypes['Input Objects']} name={'Input Objects'} />;
  }

  if (activePrimaryPane === 'Objects') {
    toRender = <List list={sortedTypes['Objects']} name={'Objects'} />;
  }

  if (activePrimaryPane === 'Scalars') {
    toRender = (
      <List list={sortedTypes['Scalars']} name={'Scalars'} showDescription={false} />
    );
  }

  if (activePrimaryPane === 'Unions') {
    toRender = <List list={sortedTypes['Unions']} name={'Unions'} />;
  }

  if (activePrimaryPane === 'Interfaces') {
    toRender = <List list={sortedTypes['Interfaces']} name={'Interfaces'} />;
  }

  return (
    <div
      className={secondaryPaneClass({
        activeTertiaryPane: activeTertiaryPane !== null,
      })}
    >
      {toRender}
    </div>
  );
};
