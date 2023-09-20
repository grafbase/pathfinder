import { GraphQLSchema } from "graphql";
import { HTTPHeaderValue } from "../session-store";

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
  }: {
    fetchOptions: EndpointConnectionDetails;
  }) => Promise<GraphQLSchema | null>;
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
