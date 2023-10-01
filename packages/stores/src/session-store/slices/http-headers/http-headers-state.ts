import { generateCuid } from "@pathfinder/shared";
import { HTTPHeadersState } from "./http-headers.types";

export const INITIAL_HTTP_HEADERS_STATE: HTTPHeadersState = {
  headers: [
    {
      id: generateCuid({}),
      enabled: true,
      key: "content-type",
      value: "application/json",
    },
  ],
};

export const httpHeadersState = {
  ...INITIAL_HTTP_HEADERS_STATE,
};
