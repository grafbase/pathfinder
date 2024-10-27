import { ReactNode, useEffect, useMemo } from 'react';
import { GraphQLSchema } from 'graphql';

import { useSchemaDocumentationStore } from '../../store';

import { initializeTheme, type ThemeOptions } from '@pathfinder-ide/stores';

import { sortTypes } from '../../utils';

import { LoadingSchema, Resizer } from '../../../components';
import { Section } from '../section';
import { TertiaryPane } from '../tertiary-pane';
import { TypeSystemNavButton } from '../type-system-nav-button';

import { panesClass, schemaDocumentationStyles } from './schema-documentation.css';

import { sharedPaneClass } from '../../shared.styles.css';
import { TopLevelPane, SortedTypeMap } from '../../types';
import { Breadcrumbs } from '../breadcrumbs';
import { Pane } from '../pane';

type SchemaDocumentationProps = {
  schema?: GraphQLSchema;
  themeOptions?: Partial<ThemeOptions>;
  tertiaryPaneFieldSlotComponent?: ReactNode;
};

export const SchemaDocumentation = ({
  schema,
  themeOptions,
  tertiaryPaneFieldSlotComponent,
}: SchemaDocumentationProps) => {
  const activeTertiaryPane = useSchemaDocumentationStore.use.activeTertiaryPane();

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
                    {queryRootType && (
                      <TypeSystemNavButton
                        destinationPane="Query"
                        copy={'Query'}
                        count={
                          Object.keys(
                            queryRootType.getFields(),
                          ).length.toString() as string
                        }
                      />
                    )}
                    {mutationRootType && (
                      <TypeSystemNavButton
                        destinationPane="Mutation"
                        copy={'Mutation'}
                        count={
                          Object.keys(
                            mutationRootType.getFields(),
                          ).length.toString() as string
                        }
                      />
                    )}

                    {subscriptionRootType && (
                      <TypeSystemNavButton
                        destinationPane="Subscription"
                        copy={'Subscription'}
                        count={
                          Object.keys(
                            subscriptionRootType.getFields(),
                          ).length.toString() as string
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
                        destinationPane={s as TopLevelPane}
                        copy={s}
                        count={sortedTypes[s as keyof SortedTypeMap].length.toString()}
                      />
                    );
                  })}
                  <TypeSystemNavButton
                    destinationPane="Directives"
                    copy={'Directives'}
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
                  component: (
                    <Pane
                      directives={directives}
                      queryRootType={queryRootType || null}
                      mutationRootType={mutationRootType || null}
                      subscriptionRootType={subscriptionRootType || null}
                      sortedTypes={sortedTypes}
                    />
                  ),
                }}
                pane2={{
                  component: (
                    <>
                      {activeTertiaryPane && (
                        <TertiaryPane
                          pane={activeTertiaryPane['pane']}
                          fieldSlotComponent={tertiaryPaneFieldSlotComponent || undefined}
                        />
                      )}
                    </>
                  ),
                  initialSize: { type: 'PERCENT', value: 50 },
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
