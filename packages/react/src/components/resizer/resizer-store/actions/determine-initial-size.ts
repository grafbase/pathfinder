import { ResizerStoreActions } from "../resizer-store.types";

export const determineInitialSize: ResizerStoreActions["determineInitialSize"] =
  ({ containerRef, initialSize, orientation }) => {
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
  };
