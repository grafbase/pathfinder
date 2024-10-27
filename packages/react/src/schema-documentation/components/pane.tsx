import { type ReactElement } from 'react';
import type { GraphQLDirective, GraphQLObjectType } from 'graphql';

import { paneClass } from './pane.css';
import { useSchemaDocumentationStore } from '../store';
import { SortedTypeMap } from '../types';
import { List } from './list';

export const Pane = ({
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
    const fields = queryRootType.getFields();
    toRender = <List items={Object.keys(fields).map((field) => fields[field])} />;
  }

  if (activePrimaryPane === 'Mutation' && mutationRootType) {
    const fields = mutationRootType.getFields();
    toRender = <List items={Object.keys(fields).map((field) => fields[field])} />;
  }

  if (activePrimaryPane === 'Subscription' && subscriptionRootType) {
    const fields = subscriptionRootType.getFields();
    toRender = <List items={Object.keys(fields).map((field) => fields[field])} />;
  }

  if (activePrimaryPane === 'Directives') {
    toRender = <List items={directives} />;
  }

  if (activePrimaryPane === 'Enums') {
    toRender = <List items={sortedTypes['Enums']} />;
  }

  if (activePrimaryPane === 'Input Objects') {
    toRender = <List items={sortedTypes['Input Objects']} />;
  }

  if (activePrimaryPane === 'Objects') {
    toRender = <List items={sortedTypes['Objects']} />;
  }

  if (activePrimaryPane === 'Scalars') {
    toRender = <List items={sortedTypes['Scalars']} />;
  }

  if (activePrimaryPane === 'Unions') {
    toRender = <List items={sortedTypes['Unions']} />;
  }

  if (activePrimaryPane === 'Interfaces') {
    toRender = <List items={sortedTypes['Interfaces']} />;
  }

  return (
    <div
      className={paneClass({
        activeTertiaryPane: activeTertiaryPane !== null,
      })}
    >
      {toRender}
    </div>
  );
};
