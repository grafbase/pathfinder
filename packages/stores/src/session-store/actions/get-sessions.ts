import { keys } from 'idb-keyval';

import { STORAGE_NAME_SESSION } from '@pathfinder-ide/shared';

export const getSessions = () => {
  return keys().then((keys) => {
    return keys.filter((key) => {
      if (typeof key === 'string' && key.includes(STORAGE_NAME_SESSION)) {
        return true;
      }
    });
  });
};
