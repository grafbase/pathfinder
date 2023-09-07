import { init as initCuid } from "@paralleldrive/cuid2";

import { HTTPHeadersStore } from "../http-headers-store";

import type {
  HTTPHeaderValue,
  HTTPHeadersStoreActions,
} from "../http-headers-store.types";

const baseHeader = ({ id }: { id: string }): HTTPHeaderValue => ({
  id,
  enabled: false,
  key: "",
  value: "",
});

export const addEmptyHeader: HTTPHeadersStoreActions["addEmptyHeader"] = () => {
  HTTPHeadersStore.setState({
    headers: [
      ...HTTPHeadersStore.getState().headers,
      baseHeader({ id: initCuid({ length: 10 })() }),
    ],
  });
};
