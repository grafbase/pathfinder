import {
  GetUseResizerStore,
  SetUseResizerStore,
  UseResizerActions,
} from "./use-resizer.types";

export const useResizerActions = (
  set: SetUseResizerStore,
  get: GetUseResizerStore,
): UseResizerActions => ({
  determineInitialSize: ({ containerRef, initialSize, orientation }) => {
    const container = containerRef.current;
    if (!containerRef || !container) {
      return null;
    }

    const containerWidthOrHeight =
      orientation === "HORIZONTAL"
        ? container.clientWidth
        : container.clientHeight;

    if (initialSize.type === "PERCENT") {
      return 1 - initialSize.value * 0.01;
    }
    return 1 - initialSize.value / containerWidthOrHeight / 1;
  },
  resetPane: () => {
    const initialSize = get().initialSize;
    const pane1Size = get().pane1Size;
    if (initialSize === pane1Size) {
      get().setPane1Size(get().previousSize);
    } else {
      get().setPreviousSize(pane1Size);
      get().setPane1Size(initialSize);
    }
  },
  setInitialSize: (value) => {
    set({ initialSize: value });
  },
  setPane1Size: (value) => {
    set({ pane1Size: value });
  },
  setPreviousSize: (value) => set({ previousSize: value }),
});
