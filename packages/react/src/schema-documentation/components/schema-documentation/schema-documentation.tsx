import { useEffect } from 'react';
import { GraphQLSchema } from 'graphql';

import { useSchemaDocumenationStore } from '../../store';

import { initializeTheme, type ThemeOptions } from '@pathfinder-ide/stores';

import { sortTypes } from '../../utils';

import { LoadingSchema, Resizer } from '../../../components';
import { SecondaryPane } from '../secondary-pane/secondary-pane';
import { Section, SectionDescription } from '../section';
import { TertiaryPane } from '../tertiary-pane';
import { TypeSystemNavButton } from '../type-system-nav-button';
import { TypesNav } from '../types-nav';

import {
  breadcrumbClass,
  breadcrumbArrowClass,
  breadcrumbItemClass,
  panesClass,
  schemaDocumentationClass,
} from './schema-documentation.css';

import { sharedPaneClass } from '../../shared.styles.css';

type SchemaDocumentationProps = {
  schema?: GraphQLSchema;
  themeOptions?: Partial<ThemeOptions>;
};

export const SchemaDocumentation = ({
  schema,
  themeOptions,
}: SchemaDocumentationProps) => {
  const activePrimaryPane = useSchemaDocumenationStore.use.activePrimaryPane();
  const activeTertiaryPane = useSchemaDocumenationStore.use.activeTertiaryPane();
  const tertiaryPaneStack = useSchemaDocumenationStore.use.tertiaryPaneStack();

  useEffect(() => {
    // set the theme and handle overrides if provided
    initializeTheme({ options: themeOptions });
  }, [themeOptions]);

  if (!schema) {
    return <LoadingSchema />;
  }

  const typeMap = schema.getTypeMap();
  const sortedTypes = sortTypes({ typeMap });
  const queryRootType = schema?.getQueryType();
  const mutationRootType = schema?.getMutationType();
  const subscriptionRootType = schema?.getSubscriptionType();
  const directives = schema?.getDirectives();

  return (
    <div className={schemaDocumentationClass}>
      <div className={breadcrumbClass}>
        <span>Schema</span>
        <span className={breadcrumbArrowClass}>{`->`}</span>
        <span>{activePrimaryPane}</span>
        {tertiaryPaneStack.length > 0 &&
          tertiaryPaneStack.map((stackItem) => (
            <span key={stackItem.hash} className={breadcrumbItemClass}>
              <span className={breadcrumbArrowClass}>{`->`}</span>
              {stackItem.pane.name}
            </span>
          ))}
      </div>
      <div className={panesClass}>
        <Resizer
          resizerName="schema_docs_1"
          onSurface={1}
          orientation="HORIZONTAL"
          pane1={{
            component: (
              <div className={sharedPaneClass}>
                <SectionDescription
                  description={schema.description}
                  lead={`Schema description`}
                />

                <Section lead={`Root Operation Types`}>
                  {queryRootType && (
                    <TypeSystemNavButton
                      destinationPane="Query"
                      copy={'Query'}
                      count={
                        Object.keys(queryRootType.getFields()).length.toString() as string
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
                </Section>

                <TypesNav sortedTypes={sortedTypes} />

                <Section lead={`Other`}>
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
                    <SecondaryPane
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
                        <TertiaryPane pane={activeTertiaryPane['pane']} />
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
