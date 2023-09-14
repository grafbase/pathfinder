import { HTTPHeadersState } from "./http-headers.types";

const INITIAL_HTTP_HEADERS_STATE: HTTPHeadersState = {
  headers: [],
};

export const httpHeadersState = {
  ...INITIAL_HTTP_HEADERS_STATE,
};
