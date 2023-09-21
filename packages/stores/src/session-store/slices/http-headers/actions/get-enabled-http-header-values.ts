import { HTTPHeadersActions } from "../http-headers.types";

export const getEnabledTTPHeaderValues: HTTPHeadersActions["getEnabledTTPHeaderValues"] =
  ({ headers }) => {
    return headers
      .filter((header) => header.enabled)
      .map((header) => [header.key, header.value]);
  };
