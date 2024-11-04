import { HTTPHeadersActions } from '../http-headers.types';

export const getEnabledHTTPHeaderValues: HTTPHeadersActions['getEnabledHTTPHeaderValues'] =
  ({ headers }) => {
    return headers
      .filter((header) => header.enabled)
      .map((header) => [header.key, header.value] as [string, string]);
  };

export const getEnabledHTTPHeaderValueRecord: HTTPHeadersActions['getEnabledHTTPHeaderValueRecord'] =
  ({ headers }) => {
    // we use this function to prepare headers for the graphql-sse client
    // we're calling lowercase here to ensure that graphql-sse correctly merges headers ("Content-Type"): https://github.com/enisdenjo/graphql-sse/commit/0084de7c7f55c77c9b9156b98c264b90f49bf2b2
    return headers
      .filter((header) => header.enabled)
      .reduce(
        (accumulator, currentValue) => ({
          ...accumulator,
          [currentValue.key.toLowerCase()]: currentValue.value,
        }),
        {} as Record<string, string>,
      );
  };
