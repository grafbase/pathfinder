import { generateCuid } from "@pathfinder-ide/shared";

import { sessionStore } from "../../../session-store";

import type {
  HTTPHeaderValue,
  HTTPHeadersActions,
} from "../http-headers.types";

const baseHeader = ({
  enabled,
  id,
}: {
  enabled: boolean;
  id: string;
}): HTTPHeaderValue => ({
  id,
  enabled,
  key: "",
  value: "",
});

export const addEmptyHeader: HTTPHeadersActions["addEmptyHeader"] = ({
  enabled = false,
}) => {
  sessionStore.setState({
    headers: [
      ...sessionStore.getState().headers,
      baseHeader({ enabled, id: generateCuid({}) }),
    ],
  });
};
