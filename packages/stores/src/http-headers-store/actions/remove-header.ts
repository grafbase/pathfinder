import { HTTPHeadersStore } from "../http-headers-store";

import type { HTTPHeadersStoreActions } from "../http-headers-store.types";

export const removeHeader: HTTPHeadersStoreActions["removeHeader"] = ({
  id,
}) => {
  const headers = HTTPHeadersStore.getState().headers;
  HTTPHeadersStore.setState({
    headers: headers.filter((header) => header.id !== id),
  });
};
