import { createStore } from 'zustand/vanilla';
import { persist } from 'zustand/middleware';

import { STORAGE_NAME_SESSION } from '@pathfinder-ide/shared';

import { storage } from '../storage';

import { editorTabsState } from './slices/editor-tabs';
import { historyState } from './slices/history';
import { httpHeadersState } from './slices/http-headers';
import { variablesState } from './slices/variables';

import { sessionStoreState } from './session-store-state';

import { SessionStoreState } from './session-store.types';

type StateToPersist = Omit<SessionStoreState, '_hasHydrated' | 'connectionDialogOpen'>;

export const sessionStore = createStore<SessionStoreState>()(
  persist(
    () => ({
      ...editorTabsState,
      ...historyState,
      ...httpHeadersState,
      ...sessionStoreState,
      ...variablesState,
    }),
    {
      // we skip automatic hydration here and manually call rehydrate() manually
      // this allows us to be confident that we'll have access to passed-in headers in our merge function
      skipHydration: true,
      name: STORAGE_NAME_SESSION,
      onRehydrateStorage: () => {
        return (_state, error) => {
          if (error) {
            console.warn('an error occurred during sessionStore hydration', error);
          }
        };
      },
      partialize: (state) => ({
        // editor tabs
        activeTab: state.activeTab,
        tabs: state.tabs,
        // history
        executions: state.executions,
        // http-headers
        headers: state.headers,
        // variables
        variablesString: state.variablesString,
        // sessions
        endpoint: state.endpoint,
      }),
      storage: storage<StateToPersist>(),
      version: 0,
    },
  ),
);
