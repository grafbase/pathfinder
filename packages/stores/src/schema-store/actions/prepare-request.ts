import { useSessionStore } from "../../session-store";
import type {
  AcceptableHeaders,
  SchemaStoreActions,
} from "../schema-store.types";

export const prepareRequest: SchemaStoreActions["prepareRequest"] = () => {
  const endpoint = useSessionStore.getState().endpoint as string;

  const enabledHTTPHeaders: AcceptableHeaders = useSessionStore
    .getState()
    .headers.filter((header) => header.enabled)
    .map((header) => [header.key, header.value]);

  const headers: HeadersInit = [...(enabledHTTPHeaders || [])];

  return { endpoint, headers };
};
