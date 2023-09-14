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
    headers: HeadersInit;
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
  doSchemaPolling: () => void;
  executeOperation: () => Promise<void>;
  getSchemaViaIntrospection: () => Promise<GraphQLSchema | null>;
  httpFetcher: ({
    graphQLParams,
  }: {
    graphQLParams: GraphQLOperationParams;
  }) => Promise<Response | void>;
  loadSchema: () => Promise<void>;
  prepareRequest: () => { endpoint: string; headers: HeadersInit };
  resetSchemaPolling: () => void;
  setSchemaPollingTimer: ({
    pollingTimer,
  }: {
    pollingTimer: NodeJS.Timeout;
  }) => void;
};

export type SchemaStoreState = {
  introspectionErrors: Array<string>;
  isExecuting: boolean;
  isIntrospecting: boolean;
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
