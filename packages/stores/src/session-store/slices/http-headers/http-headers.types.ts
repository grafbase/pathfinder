export type HTTPHeaderValue = {
  id: string;
  enabled: boolean;
  key: string;
  value: string;
};

export type UpdateHeaderKeyOrValue = {
  keyOrValue: 'key' | 'value';
  value: string;
};

export type UpdateHeaderStatus = {
  enabled: boolean;
};

export type HTTPHeadersActions = {
  addEmptyHeader: ({ enabled }: { enabled?: boolean }) => void;
  getEnabledHTTPHeaderValues: ({
    headers,
  }: {
    headers: HTTPHeaderValue[];
  }) => HeadersInit;
  getEnabledHTTPHeaderValueRecord: ({
    headers,
  }: {
    headers: HTTPHeaderValue[];
  }) => Record<string, string>;
  removeHeader: ({ id }: { id: string }) => void;
  updateHeader: ({
    id,
    payload,
  }: {
    id: string;
    payload: UpdateHeaderKeyOrValue | UpdateHeaderStatus;
  }) => void;
};

export type HTTPHeadersState = {
  headers: HTTPHeaderValue[];
};
