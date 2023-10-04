import {
  executeOperation,
  useGraphQLDocumentStore,
  useSchemaStore,
} from "@pathfinder/stores";

import { Button } from "../button";

export const ActionExecute = () => {
  const activeDocumentEntry = useGraphQLDocumentStore.use.activeDocumentEntry();
  const documentNotifications =
    useGraphQLDocumentStore.use.documentNotifications();

  const isExecuting = useSchemaStore.use.isExecuting();

  const shouldBeDisabled =
    !activeDocumentEntry || documentNotifications.length > 0 || isExecuting;

  return (
    <Button
      action={() => {
        executeOperation();
      }}
      copy={
        (activeDocumentEntry && activeDocumentEntry.node.name?.value) || "Run"
      }
      iconName="Caret"
      isDisabled={shouldBeDisabled}
      onSurface={1}
      size="medium"
      title="Execute the active operation"
      withBorder={true}
    />
  );
};
