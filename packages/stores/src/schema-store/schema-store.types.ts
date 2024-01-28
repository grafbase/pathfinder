import { GraphQLSchema } from 'graphql';
import { HTTPHeaderValue } from '../session-store';

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
    status: Response['status'];
  };
  timestamp: Date;
};

export type EndpointConnectionDetails = {
  endpoint: string;
  headers?: HTTPHeaderValue[];
};

export type SchemaStoreActions = {
  doIntrospection: ({
    fetchOptions,
  }: {
    fetchOptions: EndpointConnectionDetails;
  }) => Promise<GraphQLSchema | null>;
  doSchemaPolling: ({
    fetchOptions,
  }: {
    fetchOptions: EndpointConnectionDetails;
  }) => void;
  executeOperation: () => Promise<void>;
  httpFetcher: ({
    fetchOptions,
    graphQLParams,
  }: {
    fetchOptions: EndpointConnectionDetails;
    graphQLParams: GraphQLOperationParams;
  }) => Promise<Response | void>;
  loadSchema: ({
    fetchOptions,
    schema,
  }: {
    fetchOptions: EndpointConnectionDetails;
    schema?: GraphQLSchema;
  }) => Promise<GraphQLSchema | null>;
  resetSchemaPolling: () => void;
  setSchemaPollingTimer: ({ timer }: { timer: NodeJS.Timeout | null }) => void;
};

export type SchemaStoreState = {
  introspectionErrors: Array<string>;
  isExecuting: boolean;
  isIntrospecting: boolean;
  isLoadingSchema: boolean;
  latestResponse: ExecutionResponse | null;
  schema: GraphQLSchema | null;
  polling: {
    /**
     * Whether schema polling is enabled or not
     */
    enabled: boolean;
    /**
     * The current polling interval. Default is 10000 (10 seconds).
     */
    interval: number;
    /**
     * An in-memory timer for our schema polling
     */
    timer: NodeJS.Timeout | null;
  };
};

export type SchemaStore = SchemaStoreState;
