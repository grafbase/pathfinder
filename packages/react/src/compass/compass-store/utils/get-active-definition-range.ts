import {
  type MonacoIRange,
  graphQLDocumentStore,
} from "@pathfinder-ide/stores";

export const getActiveDefinitionRange = (): MonacoIRange | null => {
  const activeDocumentEntry =
    graphQLDocumentStore.getState().activeDocumentEntry;

  if (activeDocumentEntry?.node.loc) {
    return {
      startColumn: activeDocumentEntry.node.loc.startToken.column,
      endColumn: activeDocumentEntry.node.loc.endToken.column + 1,
      startLineNumber: activeDocumentEntry.node.loc.startToken.line,
      endLineNumber: activeDocumentEntry.node.loc.endToken.line,
    };
  }
  return null;
};
