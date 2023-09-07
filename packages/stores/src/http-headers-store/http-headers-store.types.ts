export type HTTPHeaderValue = {
  id: string;
  enabled: boolean;
  key: string;
  value: string;
};

export type UpdateHeaderKeyOrValue = {
  keyOrValue: "key" | "value";
  value: string;
};

export type UpdateHeaderStatus = {
  enabled: boolean;
};

export type HTTPHeadersStoreActions = {
  addEmptyHeader: () => void;
  removeHeader: ({ id }: { id: string }) => void;
  updateHeader: ({
    id,
    payload,
  }: {
    id: string;
    payload: UpdateHeaderKeyOrValue | UpdateHeaderStatus;
  }) => void;
};

export type HTTPHeadersStoreState = {
  headers: HTTPHeaderValue[];
};
