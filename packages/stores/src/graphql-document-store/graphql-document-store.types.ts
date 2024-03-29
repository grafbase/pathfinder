import { DefinitionNode, FragmentDefinitionNode, OperationDefinitionNode } from 'graphql';

import type monaco from 'monaco-graphql/esm/monaco-editor';

type MonacoRange = monaco.Range;

// document notifications
export type DocumentNotificationType =
  | 'DUPLICATE_OPERATION_NAME'
  | 'ANONYMOUS_MUST_BE_ONLY_DEFINED'
  | 'DISALLOW_LIVE_FOR_NON_QUERY';

// graphql document state
type FragmentEntry = {
  entryType: 'FRAGMENT';
  node: FragmentDefinitionNode;
};

export type OperationEntry = {
  node: OperationDefinitionNode;
};

export type DocumentEntry = FragmentEntry | OperationEntry;

export type GraphQLDocumentStoreState = {
  /**
   * The DocumentEntry with a definition that is currently highlighted in the document editor.
   * The visual operation builder uses this entry to build its UI.
   */
  activeDocumentEntry: OperationEntry | null;
  /**
   * Notifications to display within the document editor UI
   */
  documentNotifications: DocumentNotificationType[];
  /**
   * A boolean indicating whether or not the document is parseable
   */
  isParseable: boolean;
};

export type GraphQLDocumentStoreActions = {
  handleActiveDefinition: ({
    definition,
    range,
  }: {
    definition: OperationDefinitionNode;
    range: MonacoRange;
  }) => DocumentEntry | null;
  handleInactiveDefinition: ({ range }: { range: MonacoRange }) => void;
  isOperationNameChanging: ({
    definition,
    definitions,
  }: {
    definitions: DefinitionNode[];
    definition: OperationDefinitionNode;
  }) => boolean | undefined;
  setActiveDocumentEntry: ({
    operationEntry,
  }: {
    operationEntry: OperationEntry;
  }) => void;
  setDocumentNotifications: ({ definitions }: { definitions: DefinitionNode[] }) => void;
  updateDocumentEntryOperationName: ({
    definition,
  }: {
    definition: OperationDefinitionNode;
  }) => void;
};
