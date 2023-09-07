import { del, get, set } from "idb-keyval";
import { PersistStorage } from "zustand/middleware";

export const storage = <StateToPersist>(): PersistStorage<StateToPersist> => ({
  getItem: async (name) => {
    return (await get(name)) || null;
  },
  setItem: async (name, value) => {
    return await set(name, structuredClone(value));
  },
  removeItem: async (name) => {
    await del(name);
  },
});

export const getNamespacedStorageName = ({
  endpoint,
  storageName,
}: {
  endpoint: string;
  storageName: string;
}) => {
  return `${storageName}-${endpoint}`;
};
