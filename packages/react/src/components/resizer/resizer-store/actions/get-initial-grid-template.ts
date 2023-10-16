import { ResizerProps } from "../../resizer.types";

export const getInitialGridTemplate = ({
  pane2InitialSize,
}: {
  pane2InitialSize: ResizerProps["pane2"]["initialSize"];
}) => {
  if (pane2InitialSize.type === "PERCENT") {
    const initialSize = Number((1 - pane2InitialSize.value * 0.01).toFixed(5));
    return `minmax(0, ${initialSize}fr) 0px minmax(0, ${Number(
      (1 - initialSize).toFixed(5),
    )}fr)`;
  } else {
    return `1fr 0 ${pane2InitialSize.value}px`;
  }
};
