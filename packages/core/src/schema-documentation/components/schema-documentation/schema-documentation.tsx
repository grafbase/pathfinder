import { useSchemaStore } from "@pathfinder/stores";

import {
  SchemaDocumentationStoreProvider,
  useSchemaDocumentationStore,
} from "../../store";

import { sortTypes } from "../../utils";

import { Resizer } from "../../../components";
import { SecondaryPane } from "../secondary-pane/secondary-pane";
import { Section, SectionDescription } from "../section";
import { TertiaryPane } from "../tertiary-pane";
import { TypeSystemNavButton } from "../type-system-nav-button";
import { TypesNav } from "../types-nav";

import {
  breadcrumbClass,
  breadcrumbArrowClass,
  breadcrumbItemClass,
  panesClass,
  schemaDocumentationClass,
} from "./schema-documentation.css";

import { sharedPaneClass } from "../../shared.styles.css";

export const SchemaDocumentation = () => {
  return (
    <SchemaDocumentationStoreProvider>
      <SchemaDocumentationComponent />
    </SchemaDocumentationStoreProvider>
  );
};

const SchemaDocumentationComponent = () => {
  const schema = useSchemaStore.use.schema();

  const { activePrimaryPane, activeTertiaryPane, tertiaryPaneStack } =
    useSchemaDocumentationStore();

  if (!schema) {
    return null;
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
                      copy={"Query"}
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
                      copy={"Mutation"}
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
                      copy={"Subscription"}
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
                    copy={"Directives"}
                    count={directives.length.toString() as string}
                  />
                </Section>
              </div>
            ),

            minimumSize: 40,
          }}
          pane2={{
            component: (
              <Resizer
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
                  minimumSize: 40,
                }}
                pane2={{
                  component: (
                    <>
                      {activeTertiaryPane && (
                        <TertiaryPane pane={activeTertiaryPane["pane"]} />
                      )}
                    </>
                  ),
                  initialSize: { type: "PERCENT", value: 50 },
                  minimumSize: 40,
                }}
              />
            ),
            initialSize: { type: "PERCENT", value: 80 },
          }}
        />
      </div>
    </div>
  );
};
