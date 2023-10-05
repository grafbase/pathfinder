import { generateCuid } from "@pathfinder-ide/shared";
import { HTTPHeadersState } from "./http-headers.types";

export const INITIAL_HTTP_HEADERS_STATE: HTTPHeadersState = {
  headers: [
    {
      id: generateCuid({}),
      enabled: true,
      key: "Content-Type",
      value: "application/json",
    },
  ],
};

export const httpHeadersState = {
  ...INITIAL_HTTP_HEADERS_STATE,
};
