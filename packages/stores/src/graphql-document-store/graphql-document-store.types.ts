import {
  DefinitionNode,
  FragmentDefinitionNode,
  OperationDefinitionNode,
} from "graphql";

// import type monaco from "monaco-graphql/esm/monaco-editor";
import type monaco from "monaco-editor/esm/vs/editor/editor.api";

type MonacoIPosition = monaco.IPosition;
type MonacoRange = monaco.Range;

import { ExecutionResponse } from "../schema-store";

// document notifications
export type DocumentNotificationType =
  | "DUPLICATE_OPERATION_NAME"
  | "ANONYMOUS_MUST_BE_ONLY_DEFINED"
  | "DISALLOW_LIVE_FOR_NON_QUERY";

// export type HistoryItem = FetchError | FetchResponse;

// type FetchResponse = {
//   duration:
// }

// graphql document state
type FragmentEntry = {
  entryType: "FRAGMENT";
  node: FragmentDefinitionNode;
};

export type OperationEntry = {
  latestResponse: ExecutionResponse | null;
  // operationHistory: HistoryItem[];
  node: OperationDefinitionNode;
};

export type DocumentEntry = FragmentEntry | OperationEntry;

export type GraphQLDocumentStoreState = {
  /**
   * A boolean indicating whether Zustand's persist middleware has rehydrated our state
   */
  _hasHydrated: boolean;
  /**
   * The DocumentEntry with a definition that is currently highlighted in the document editor.
   * The visual operation builder uses this entry to build its UI.
   */
  activeDocumentEntry: OperationEntry | null;
  /**
   * The cursor position within the document editor
   */
  cursorPosition: MonacoIPosition | null;
  /**
   * Definitions within the editor along with their run history
   */
  documentEntries: DocumentEntry[];
  /**
   * Notifications to display within the document editor UI
   */
  documentNotifications: DocumentNotificationType[];
  /**
   * The full string value of the document editor, used during rehydration
   */
  documentString: string;
  /**
   * A boolean indicating whether or not the document is parseable
   */
  isParseable: boolean;
  /**
   * The full string value of the variables editor, used during rehydration
   */
  variablesString: string;
};

export type GraphQLDocumentStoreActions = {
  getEntryForDefinition: ({
    definition,
  }: {
    definition: OperationDefinitionNode;
  }) => DocumentEntry | undefined;
  handleActiveDefinition: ({
    definition,
    range,
  }: {
    definition: OperationDefinitionNode;
    range: MonacoRange;
  }) => DocumentEntry | null;
  handleInactiveDefinition: ({ range }: { range: MonacoRange }) => void;
  handleNewDefinition: ({
    definition,
  }: {
    definition: OperationDefinitionNode;
  }) => OperationEntry;
  isOperationNameChanging: ({
    definition,
  }: {
    definition: OperationDefinitionNode;
  }) => boolean | undefined;
  setActiveDocumentEntry: ({
    operationEntry,
  }: {
    operationEntry: OperationEntry;
  }) => void;
  setDocumentNotifications: ({
    definitions,
  }: {
    definitions: DefinitionNode[];
  }) => void;
  updateDocumentEntryDefinition: ({
    definition,
  }: {
    definition: OperationDefinitionNode;
  }) => DocumentEntry | null;
  updateDocumentEntryOperationName: ({
    definition,
  }: {
    definition: OperationDefinitionNode;
  }) => void;
  updateDocumentEntryResponse: ({
    executionResponse,
  }: {
    executionResponse: ExecutionResponse;
  }) => void;
};
