import { ResizerProps } from '../resizer.types';

export type AvailableResizers =
  | 'ide_resizer'
  | 'editors_resizer'
  | 'scout_resizer'
  | 'history_resizer'
  | 'schema_docs_1'
  | 'schema_docs_2';

export type Resizer = {
  name: AvailableResizers;
  pane2InitialSize: ResizerProps['pane2']['initialSize'];
  gridTemplate: string;
  startingGridTemplate: string | null;
};

export type ResizerStoreActions = {
  resetPane: ({ resizerName }: { resizerName: AvailableResizers }) => void;
  setResizerState: ({
    name,
    updates,
  }: {
    name: AvailableResizers;
    updates: Partial<Omit<Resizer, 'name'>>;
  }) => void;
};

type ResizerStoreState = {
  ide_resizer: Resizer;
  editors_resizer: Resizer;
  scout_resizer: Resizer;
  history_resizer: Resizer;
  schema_docs_1: Resizer;
  schema_docs_2: Resizer;
};

export type ResizerStore = ResizerStoreState;
