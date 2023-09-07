import { HTTPHeadersStoreState } from "./http-headers-store.types";

const INITIAL_HTTP_HEADERS_STORE_STATE: HTTPHeadersStoreState = {
  headers: [],
};

export const httpHeadersState = {
  ...INITIAL_HTTP_HEADERS_STORE_STATE,
};
