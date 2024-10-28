import { useEffect, useMemo } from 'react';
import { GraphQLSchema } from 'graphql';

import { useSchemaDocumentationStore } from '../../store';

import { initializeTheme, type ThemeOptions } from '@pathfinder-ide/stores';

import { sortTypes } from '../../utils';

import { LoadingSchema, Resizer } from '../../../components';
import { Section } from '../section';
import { DetailsPane } from '../details-pane';
import { TypeSystemNavButton } from '../type-system-nav-button';

import { panesClass, schemaDocumentationStyles } from './schema-documentation.css';

import { sharedPaneClass } from '../../shared.styles.css';
import { Breadcrumbs } from '../breadcrumbs';
import { Panes } from '../panes';
import { DetailsPaneTabSlotComponent, SortedTypeMap } from '../../types';

type SchemaDocumentationProps = {
  schema?: GraphQLSchema;
  themeOptions?: Partial<ThemeOptions>;
  detailsPaneTabSlotComponents?: DetailsPaneTabSlotComponent[];
};

export const SchemaDocumentation = ({
  schema,
  themeOptions,
  detailsPaneTabSlotComponents,
}: SchemaDocumentationProps) => {
  const activeDetailsPane = useSchemaDocumentationStore.use.activeDetailsPane();

  useEffect(() => {
    // set the theme and handle overrides if provided
    initializeTheme({ options: themeOptions });
  }, [themeOptions]);

  const typeMap = schema?.getTypeMap();
  const sortedTypesNullable = useMemo(() => {
    if (!typeMap) return;
    return sortTypes({ typeMap });
  }, [typeMap]);

  if (!schema) {
    return <LoadingSchema />;
  }

  const sortedTypes = sortedTypesNullable as ReturnType<typeof sortTypes>;
  const queryRootType = schema?.getQueryType();
  const mutationRootType = schema?.getMutationType();
  const subscriptionRootType = schema?.getSubscriptionType();
  const directives = schema?.getDirectives();

  const queryFields = queryRootType?.getFields();
  const mutationFields = mutationRootType?.getFields();
  const subscriptionFields = subscriptionRootType?.getFields();

  return (
    <div className={schemaDocumentationStyles.container}>
      <Breadcrumbs />
      <div className={panesClass}>
        <Resizer
          resizerName="schema_docs_1"
          onSurface={1}
          orientation="HORIZONTAL"
          pane1={{
            component: (
              <div className={sharedPaneClass}>
                <Section lead={`Root Operation Types`} withSeparator>
                  <div className={schemaDocumentationStyles.list}>
                    {queryFields && (
                      <TypeSystemNavButton
                        pane={{
                          id: queryRootType?.name || 'Query',
                          name: queryRootType?.name || 'Query',
                          pane: Object.keys(queryFields).map(
                            (field) => queryFields[field],
                          ),
                        }}
                        count={Object.keys(queryFields).length.toString() as string}
                      />
                    )}
                    {mutationFields && (
                      <TypeSystemNavButton
                        pane={{
                          id: mutationRootType?.name || 'Mutation',
                          name: mutationRootType?.name || 'Mutation',
                          pane: Object.keys(mutationFields).map(
                            (field) => mutationFields[field],
                          ),
                        }}
                        count={Object.keys(mutationFields).length.toString() as string}
                      />
                    )}
                    {subscriptionFields && (
                      <TypeSystemNavButton
                        pane={{
                          id: subscriptionRootType?.name || 'Subscription',
                          name: subscriptionRootType?.name || 'Subscription',
                          pane: Object.keys(subscriptionFields).map(
                            (field) => subscriptionFields[field],
                          ),
                        }}
                        count={
                          Object.keys(subscriptionFields).length.toString() as string
                        }
                      />
                    )}
                  </div>
                </Section>

                <Section>
                  {Object.keys(sortedTypes).map((s) => {
                    return (
                      <TypeSystemNavButton
                        key={s}
                        pane={{
                          id: s,
                          name: s,
                          pane: sortedTypes[s as keyof SortedTypeMap],
                        }}
                        count={sortedTypes[s as keyof SortedTypeMap].length.toString()}
                      />
                    );
                  })}
                  <TypeSystemNavButton
                    pane={{
                      id: 'Directives',
                      name: 'Directives',
                      pane: directives,
                    }}
                    count={directives.length.toString() as string}
                  />
                </Section>
              </div>
            ),
          }}
          pane2={{
            component: (
              <Resizer
                resizerName="schema_docs_2"
                onSurface={1}
                orientation="HORIZONTAL"
                pane1={{
                  component: <Panes />,
                }}
                pane2={{
                  component: (
                    <>
                      {activeDetailsPane && (
                        <DetailsPane
                          pane={activeDetailsPane['pane']}
                          tabSlotComponents={detailsPaneTabSlotComponents || undefined}
                        />
                      )}
                    </>
                  ),
                  initialSize: { type: 'PERCENT', value: 25 },
                }}
              />
            ),
            initialSize: { type: 'PERCENT', value: 80 },
          }}
        />
      </div>
    </div>
  );
};
