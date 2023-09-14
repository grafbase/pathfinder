import { init as initCuid } from "@paralleldrive/cuid2";
import { createStore } from "zustand/vanilla";
import { persist } from "zustand/middleware";

import { STORAGE_NAME_SESSION } from "@pathfinder/shared";

import { storage } from "../storage";

import { loadSchema, schemaStore } from "../schema-store";

import { editorTabsState } from "./slices/editor-tabs";
import { httpHeadersState } from "./slices/http-headers";
import { variablesState } from "./slices/variables";

import { sessionStoreState } from "./session-store-state";

import { SessionStoreState } from "./session-store.types";

type StateToPersist = Omit<SessionStoreState, "_hasHydrated">;

export const sessionStore = createStore<SessionStoreState>()(
  persist(
    () => ({
      ...editorTabsState,
      ...httpHeadersState,
      ...sessionStoreState,
      ...variablesState,
    }),
    {
      // we skip automatic hydration here and manually call rehydrate() manually
      // this allows us to be confident that we'll have access to passed-in headers in our merge function
      skipHydration: true,
      // merge: (persistedState, currentState) => {
      //   // collect the headers that have been passed in via props
      //   const propHeaders = sessionStore
      //     .getState()
      //     .fetcherOptions?.headers?.map((header) => ({
      //       id: initCuid({ length: 10 })(),
      //       enabled: true,
      //       key: header[0],
      //       value: header[1],
      //     }));

      //   // our final headers array
      //   let headers = [...(propHeaders ? propHeaders : [])];

      //   if (!persistedState) {
      //     // we don't have a persisted state here (new user?), so we simply merge the currentState with our propHeaders
      //     const mergedState: SessionStoreState = {
      //       ...currentState,
      //       headers,
      //     };

      //     return mergedState;
      //   }

      //   // capture our persistedState in a new variable type-casted to the proper type
      //   const persisted = persistedState as StateToPersist;

      //   // use it twice, make it nice
      //   const persistedHeaders = persisted.headers;

      //   // get a unique set of the keys from our propHeaders
      //   const keys = new Set(propHeaders?.map((d) => d.key));

      //   // merge our propHeaders, if they exist, with the headers that have been persisted
      //   headers = [
      //     ...headers,
      //     ...(persistedHeaders
      //       ? persistedHeaders.filter((d) => !keys.has(d.key))
      //       : []),
      //   ];

      //   const mergedState: SessionStoreState = {
      //     ...currentState,
      //     headers,
      //   };

      //   return mergedState;
      // },
      name: STORAGE_NAME_SESSION,
      onRehydrateStorage: () => {
        return (state, error) => {
          if (error) {
            console.warn("an error occurred during tabsStore hydration", error);
          } else {
            console.log("state on rehydration", { state });
            // if we have endpoint and/or headers here, we should call
            // if (state && state.fetcherOptions.endpoint) {
            //   console.log(
            //     "onRehydrateStorage, we have an existing andpoint so we're loading the schema with the following fetcherOptions",
            //     {
            //       state,
            //       fetcherOptions: state.fetcherOptions,
            //     },
            //   );
            //   sessionStore.setState({
            //     // _hasHydrated: true,
            //     fetcherOptions: state.fetcherOptions,
            //   });
            //   loadSchema();
            // } else {
            //   sessionStore.setState({
            //     _hasHydrated: true,
            //   });
            // }
            sessionStore.setState({
              _hasHydrated: true,
            });
          }
        };
      },
      // partialize: (state) => ({
      //   activeTab: state.activeTab,
      //   tabs: state.tabs,
      // }),
      storage: storage<StateToPersist>(),
      version: 0,
    },
  ),
);
