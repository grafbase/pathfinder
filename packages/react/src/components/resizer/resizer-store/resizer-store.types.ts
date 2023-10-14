import { ResizerOrientation, ResizerInitialSize } from "../resizer.types";

export type AvailableResizers =
  | "ide_resizer"
  | "editors_resizer"
  | "scout_resizer"
  | "history_resizer"
  | "schema_docs_1"
  | "schema_docs_2";

type Resizer = {
  name: AvailableResizers;
  initialSize: number;
  pane1Size: number;
  previousSize: number;
};

type ResizerActionCommonSignature = ({
  resizerName,
  value,
}: {
  value: number;
  resizerName: AvailableResizers;
}) => void;

export type ResizerStoreActions = {
  determineInitialSize: ({
    containerRef,
    initialSize,
    orientation,
  }: {
    containerRef: React.MutableRefObject<HTMLDivElement | null>;
    initialSize: ResizerInitialSize;
    orientation: ResizerOrientation;
  }) => number | null;
  resetPane: ({ resizerName }: { resizerName: AvailableResizers }) => void;
  setInitialSize: ResizerActionCommonSignature;
  setPane1Size: ResizerActionCommonSignature;
  setPreviousSize: ResizerActionCommonSignature;
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
