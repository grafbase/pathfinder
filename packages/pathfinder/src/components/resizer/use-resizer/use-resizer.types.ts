import { StoreApi } from "zustand";

import { ResizerOrientation, ResizerInitialSize } from "../resizer.types";

type StateSignature = (value: number) => void;

export type UseResizerActions = {
  determineInitialSize: ({
    containerRef,
    initialSize,
    orientation,
  }: {
    containerRef: React.MutableRefObject<HTMLDivElement | null>;
    initialSize: ResizerInitialSize;
    orientation: ResizerOrientation;
  }) => number | null;
  resetPane: () => void;
  setInitialSize: StateSignature;
  setPane1Size: StateSignature;
  setPreviousSize: StateSignature;
};

export type UseResizerState = {
  initialSize: number;
  pane1Size: number;
  previousSize: number;
};

export type UseResizerStore = UseResizerActions & UseResizerState;

export type GetUseResizerStore = StoreApi<UseResizerStore>["getState"];
export type SetUseResizerStore = StoreApi<UseResizerStore>["setState"];
