import { useEffect } from "react";

import { getNamespacedStorageName, useSessionStore } from "@pathfinder/stores";

import { STORAGE_NAME_SCOUT_HISTORY } from "../store/plugin-history-store";

import { usePluginHistoryStore } from "../store";

import { History } from "./history";

export const PluginScoutHistory = () => {
  useEffect(() => {
    const name = getNamespacedStorageName({
      endpoint: useSessionStore.getState().endpoint as string,
      storageName: STORAGE_NAME_SCOUT_HISTORY,
    });

    usePluginHistoryStore.persist.setOptions({
      name,
    });

    // manually rehydrate
    usePluginHistoryStore.persist.rehydrate();
  }, []);

  return <History />;
};
