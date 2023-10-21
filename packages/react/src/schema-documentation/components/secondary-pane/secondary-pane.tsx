import type { ReactElement } from 'react';
import type { GraphQLDirective, GraphQLNamedType, GraphQLObjectType } from 'graphql';

import { useSchemaDocumentationStore } from '../../store';

import { SortedTypeMap } from '../../types';

import { Section, SectionDescription, SectionFields } from '../section';
import { SummaryType } from '../summary';
import { Markdown } from '../markdown';

import { secondaryPaneClass } from './secondary-pane.css';
import { notificationClass } from '../../shared.styles.css';

const List = ({
  list,
  name,
  showDescription = true,
}: {
  list: GraphQLNamedType[] | readonly GraphQLDirective[];
  name: string;
  showDescription?: boolean;
}) => {
  return (
    <Section lead={name}>
      {list.length > 0 ? (
        list.map((x: GraphQLNamedType | GraphQLDirective) => (
          <SummaryType
            key={x.name}
            resetTertiaryPaneOnClick={true}
            showDescription={showDescription}
            type={x}
          />
        ))
      ) : (
        <p className={notificationClass}>{`This schema does not contain ${name}`}</p>
      )}
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
      <SectionFields fields={fields} resetTertiaryPaneOnClick={true} />
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
  const { activePrimaryPane, activeTertiaryPane } = useSchemaDocumentationStore();

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
