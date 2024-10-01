import { useRef, type ReactElement } from 'react';
import type { GraphQLDirective, GraphQLNamedType, GraphQLObjectType } from 'graphql';

import { useSchemaDocumentationStore } from '../../store';

import { SortedTypeMap } from '../../types';

import { Section, SectionDescription, SectionFields } from '../section';
import { SummaryType } from '../summary';
import { Markdown } from '../markdown';

import { secondaryPaneClass } from './secondary-pane.css';
import { notificationClass } from '../../shared.styles.css';
import { useVirtualizer } from '@tanstack/react-virtual';

const List = ({
  list,
  name,
  showDescription = true,
  getScrollElement,
}: {
  list: GraphQLNamedType[] | readonly GraphQLDirective[];
  name: string;
  showDescription?: boolean;
  getScrollElement: () => HTMLElement | null;
}) => {
  const count = list.length;
  const virtualizer = useVirtualizer({
    count,
    getScrollElement: getScrollElement ?? (() => null),
    estimateSize: () => 22,
    enabled: !!getScrollElement,
    scrollMargin: 48, // This is to account for the space taken by the field label at the beginning
  });

  const items = virtualizer.getVirtualItems();

  if (count === 0)
    return (
      <Section lead={name}>
        <p className={notificationClass}>{`This schema does not contain ${name}`}</p>
      </Section>
    );

  return (
    <Section lead={name}>
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
          }}
        >
          {items.map((virtualRow) => {
            const x = list[virtualRow.index];

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
  const containerRef = useRef<HTMLDivElement>(null);

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
    toRender = (
      <List
        list={directives}
        name={'Directives'}
        getScrollElement={() => containerRef.current}
      />
    );
  }

  if (activePrimaryPane === 'Enums') {
    toRender = (
      <List
        list={sortedTypes['Enums']}
        name={'Enums'}
        getScrollElement={() => containerRef.current}
      />
    );
  }

  if (activePrimaryPane === 'Input Objects') {
    toRender = (
      <List
        list={sortedTypes['Input Objects']}
        name={'Input Objects'}
        getScrollElement={() => containerRef.current}
      />
    );
  }

  if (activePrimaryPane === 'Objects') {
    toRender = (
      <List
        list={sortedTypes['Objects']}
        name={'Objects'}
        getScrollElement={() => containerRef.current}
      />
    );
  }

  if (activePrimaryPane === 'Scalars') {
    toRender = (
      <List
        list={sortedTypes['Scalars']}
        name={'Scalars'}
        showDescription={false}
        getScrollElement={() => containerRef.current}
      />
    );
  }

  if (activePrimaryPane === 'Unions') {
    toRender = (
      <List
        list={sortedTypes['Unions']}
        name={'Unions'}
        getScrollElement={() => containerRef.current}
      />
    );
  }

  if (activePrimaryPane === 'Interfaces') {
    toRender = (
      <List
        list={sortedTypes['Interfaces']}
        name={'Interfaces'}
        getScrollElement={() => containerRef.current}
      />
    );
  }

  return (
    <div
      ref={containerRef}
      className={secondaryPaneClass({
        activeTertiaryPane: activeTertiaryPane !== null,
      })}
    >
      {toRender}
    </div>
  );
};
