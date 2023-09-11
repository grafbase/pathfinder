import { GraphQLSchema } from "graphql";

export type GraphQLOperationParams = {
  query: string;
  operationName: string | undefined;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  variables?: any;
};

export type ExecutionResponse = {
  duration: number;
  request: {
    endpoint: string;
    headers: AcceptableHeaders;
    graphQLOperationParams: GraphQLOperationParams;
  };
  response: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: any;
    status: Response["status"];
  };
  timestamp: Date;
};

export type AcceptableHeaders = [string, string][];

export type SchemaStoreActions = {
  doSchemaPolling: ({
    endpoint,
    headers,
  }: {
    endpoint: string;
    headers: AcceptableHeaders;
  }) => void;
  executeOperation: () => Promise<void>;
  getSchemaViaIntrospection: ({
    endpoint,
    headers,
  }: {
    endpoint: string;
    headers: AcceptableHeaders;
  }) => Promise<GraphQLSchema | null>;
  httpFetcher: ({
    endpoint,
    graphQLParams,
    headers,
  }: {
    endpoint: string;
    graphQLParams: GraphQLOperationParams;
    headers: AcceptableHeaders;
  }) => Promise<Response | void>;
  loadSchema: () => Promise<void>;
  resetSchemaPolling: () => void;
  setSchemaPollingTimer: ({
    pollingTimer,
  }: {
    pollingTimer: NodeJS.Timeout;
  }) => void;
};

export type SchemaStoreState = {
  /**
   * Options to be used within our fetcher implementation
   */
  fetcherOptions?: {
    endpoint: string;
    headers?: AcceptableHeaders;
  } | null;
  isExecuting: boolean;
  isLoadingSchema: boolean;
  latestResponse: ExecutionResponse | null;
  pollingTimer: NodeJS.Timeout | null;
  schema: GraphQLSchema | null;
  /**
   * Optional: do schema polling at a default interval? Default is false.
   */
  withPolling?: boolean;
};

export type SchemaStore = SchemaStoreState;
