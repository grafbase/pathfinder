import type { SchemaStoreActions } from "../schema-store.types";

import { prepareRequest } from "./prepare-request";

export const httpFetcher: SchemaStoreActions["httpFetcher"] = async ({
  graphQLParams,
}) => {
  const { endpoint, headers } = prepareRequest();

  console.log("httpFetcher", {
    endpoint,
    graphQLParams,
    headers,
  });

  if (endpoint) {
    const body = JSON.stringify(graphQLParams);

    const fetchResponse = await fetch(endpoint, {
      method: "POST",
      headers,
      credentials: "same-origin",
      body,
    }).catch((error) => {
      console.warn("Error during fetch attempt:", {
        error,
      });
    });

    return fetchResponse;
  }
};
