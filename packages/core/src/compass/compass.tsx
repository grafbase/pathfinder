import { useEffect, useState } from "react";

import { Kind, OperationTypeNode } from "graphql";

import { useGraphQLDocumentStore, useSchemaStore } from "@pathfinder/stores";

// import {
//   SchemaDocumentationProvider,
//   useSchemaDocumentation,
// } from "../schema-documentation";
import { QuickDocs, RootOperation } from "./components";
import { compassClass } from "./compass.css";
import { Tabs } from "../components";
import { TabsProps } from "../components/tabs/tabs.types";

export const Compass = () => {
  return (
    // <SchemaDocumentationProvider>
    <CompassComponent />
    // </SchemaDocumentationProvider>
  );
};

const CompassComponent = () => {
  // local state to control whether we should show the query or mutation tab
  const [selectedTabIndex, setSelectedTabIndex] = useState<number>(0);

  // const { activeTertiaryPane } = useSchemaDocumentation();
  const activeTertiaryPane = false;

  const schema = useSchemaStore.use.schema();

  const activeDocumentEntry = useGraphQLDocumentStore.use.activeDocumentEntry();

  const operationDefinition =
    activeDocumentEntry?.node?.kind === Kind.OPERATION_DEFINITION
      ? activeDocumentEntry.node
      : null;

  useEffect(() => {
    // to be expanded once we integrate variables and fragments tabs
    if (!operationDefinition) {
      return setSelectedTabIndex(0);
    }
    if (operationDefinition?.operation === "query") {
      return setSelectedTabIndex(0);
    } else {
      return setSelectedTabIndex(1);
    }
  }, [operationDefinition, schema]);

  if (!schema) {
    return null;
  }

  const buildTabData = () => {
    const tabs: TabsProps = [];
    if (schema.getQueryType()?.getFields()) {
      tabs.push({
        buttonContent: () => schema.getQueryType()?.name,
        name: "queries",
        panelContent: () => (
          <RootOperation
            ancestors={[
              {
                type: "ROOT",
                operationType: OperationTypeNode.QUERY,
                operationDefinition,
              },
            ]}
            fields={schema.getQueryType()?.getFields()}
          />
        ),
      });
    }
    if (schema.getMutationType()?.getFields()) {
      tabs.push({
        buttonContent: () => schema.getMutationType()?.name,
        name: "mutations",
        panelContent: () => (
          <RootOperation
            ancestors={[
              {
                type: "ROOT",
                operationType: OperationTypeNode.MUTATION,
                operationDefinition,
              },
            ]}
            fields={schema.getMutationType()?.getFields()}
          />
        ),
      });
    }
    if (schema.getSubscriptionType()?.getFields()) {
      tabs.push({
        buttonContent: () => schema.getSubscriptionType()?.name,
        name: "subscriptions",
        panelContent: () => (
          <RootOperation
            ancestors={[
              {
                type: "ROOT",
                operationType: OperationTypeNode.SUBSCRIPTION,
                operationDefinition,
              },
            ]}
            fields={schema.getSubscriptionType()?.getFields()}
          />
        ),
      });
    }
    return tabs;
  };

  return (
    <div className={compassClass}>
      {activeTertiaryPane ? (
        <QuickDocs />
      ) : (
        <Tabs
          controlled={{
            selectedTabIndex,
            setSelectedTabIndex,
          }}
          styles={{
            onSurface: 1,
          }}
          tabs={buildTabData()}
        />
      )}
    </div>
  );
};
