import { HTTPHeadersActions } from '../http-headers.types';

export const getEnabledHTTPHeaderValues: HTTPHeadersActions['getEnabledHTTPHeaderValues'] =
  ({ headers }) => {
    return headers
      .filter((header) => header.enabled)
      .map((header) => [header.key, header.value] as [string, string]);
  };

export const getEnabledHTTPHeaderValueRecord: HTTPHeadersActions['getEnabledHTTPHeaderValueRecord'] =
  ({ headers }) => {
    return headers
      .filter((header) => header.enabled)
      .reduce(
        (accumulator, currentValue) => ({
          ...accumulator,
          [currentValue.key]: currentValue.value,
        }),
        {} as Record<string, string>,
      );
  };
