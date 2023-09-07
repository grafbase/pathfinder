import { init as initCuid } from "@paralleldrive/cuid2";
import { createStore } from "zustand/vanilla";
import { persist } from "zustand/middleware";

import { schemaStore } from "../schema-store";

import { STORAGE_NAME_HTTP_HEADERS } from "@graphql-pathfinder/shared";

import { httpHeadersState } from "./state";

import { storage } from "../storage";

import type { HTTPHeadersStoreState } from "./http-headers-store.types";

type StateToPersist = HTTPHeadersStoreState;

export const HTTPHeadersStore = createStore<HTTPHeadersStoreState>()(
  persist(
    () => ({
      ...httpHeadersState,
    }),
    {
      // we skip automatic hydration here and manually call rehydrate() when our HTTPHeaderControl component loads.
      // this allows us to be confident that we'll have access to passed-in headers in our merge function
      skipHydration: true,
      merge: (persistedState, currentState) => {
        // collect the headers that have been passed in via props
        const propHeaders = schemaStore
          .getState()
          .fetcherOptions?.headers?.map((header) => ({
            id: initCuid({ length: 10 })(),
            enabled: true,
            key: header[0],
            value: header[1],
          }));

        // our final headers array
        let headers = [...(propHeaders ? propHeaders : [])];

        if (!persistedState) {
          // we don't have a persisted state here (new user?), so we simply merge the currentState with our propHeaders
          const mergedState: HTTPHeadersStoreState = {
            ...currentState,
            headers,
          };

          return mergedState;
        }

        // capture our persistedState in a new variable type-casted to the proper type
        const persisted = persistedState as StateToPersist;

        // use it twice, make it nice
        const persistedHeaders = persisted.headers;

        // get a unique set of the keys from our propHeaders
        const keys = new Set(propHeaders?.map((d) => d.key));

        // merge our propHeaders, if they exist, with the headers that have been persisted
        headers = [
          ...headers,
          ...(persistedHeaders
            ? persistedHeaders.filter((d) => !keys.has(d.key))
            : []),
        ];

        const mergedState: HTTPHeadersStoreState = {
          ...currentState,
          headers,
        };

        return mergedState;
      },
      name: STORAGE_NAME_HTTP_HEADERS,
      storage: storage<StateToPersist>(),
      version: 0,
    },
  ),
);
