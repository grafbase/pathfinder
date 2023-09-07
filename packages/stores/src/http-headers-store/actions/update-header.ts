import { HTTPHeadersStore } from "../http-headers-store";

import type { HTTPHeadersStoreActions } from "../http-headers-store.types";

export const updateHeader: HTTPHeadersStoreActions["updateHeader"] = ({
  id,
  payload,
}) => {
  const update =
    "keyOrValue" in payload
      ? { [payload.keyOrValue]: payload.value }
      : { enabled: payload.enabled };

  const headers = [...HTTPHeadersStore.getState().headers];
  const existingHeaderIndex = headers.findIndex((header) => header.id === id);

  headers[existingHeaderIndex] = {
    ...headers[existingHeaderIndex],
    ...update,
  };

  HTTPHeadersStore.setState({ headers });
};
