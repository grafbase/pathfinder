import { sessionStore } from '../../../session-store';

import type { HTTPHeadersActions } from '../http-headers.types';

export const updateHeader: HTTPHeadersActions['updateHeader'] = ({ id, payload }) => {
  const update =
    'keyOrValue' in payload
      ? { [payload.keyOrValue]: payload.value }
      : { enabled: payload.enabled };

  const headers = [...sessionStore.getState().headers];
  const existingHeaderIndex = headers.findIndex((header) => header.id === id);

  headers[existingHeaderIndex] = {
    ...headers[existingHeaderIndex],
    ...update,
  };

  return sessionStore.setState({ headers });
};
