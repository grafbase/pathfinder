import { sessionStore } from "../../../session-store";

import type { HTTPHeadersActions } from "../http-headers.types";

export const removeHeader: HTTPHeadersActions["removeHeader"] = ({ id }) => {
  const headers = sessionStore.getState().headers;
  sessionStore.setState({
    headers: headers.filter((header) => header.id !== id),
  });
};
