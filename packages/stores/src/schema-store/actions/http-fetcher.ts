import type { SchemaStoreActions } from "../schema-store.types";

export const httpFetcher: SchemaStoreActions["httpFetcher"] = async ({
  endpoint,
  graphQLParams,
  headers,
}) => {
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
  console.log("httpFetcher", {
    endpoint,
    graphQLParams,
    headers,
  });

  return fetchResponse;
};
