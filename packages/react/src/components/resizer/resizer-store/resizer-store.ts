import { createStore } from 'zustand/vanilla';

import type { Resizer, ResizerStore } from './resizer-store.types';

const commonResizerDefaults: Omit<Resizer, 'name'> = {
  pane2InitialSize: {
    type: 'PIXELS',
    value: 0,
  },
  gridTemplate: 'minmax(0, 0.5fr) 0px minmax(0, 0.5fr)',
  startingGridTemplate: null,
};

export const resizerStore = createStore<ResizerStore>()(() => ({
  ide_resizer: {
    name: 'ide_resizer',
    ...commonResizerDefaults,
  },
  editors_resizer: {
    name: 'editors_resizer',
    ...commonResizerDefaults,
  },
  scout_resizer: {
    name: 'scout_resizer',
    ...commonResizerDefaults,
  },
  history_resizer: {
    name: 'history_resizer',
    ...commonResizerDefaults,
  },
  schema_docs_1: {
    name: 'schema_docs_1',
    ...commonResizerDefaults,
  },
  schema_docs_2: {
    name: 'schema_docs_2',
    ...commonResizerDefaults,
  },
}));
