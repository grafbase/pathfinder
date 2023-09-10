import { shared, style } from "@pathfinder/style";

export const rootOperationClass = style([
  shared.scrollbars,
  {
    height: "100%",
    width: "100%",
    overflowX: "hidden",
    padding: 0,
    margin: 0,
    display: "flex",
    flexDirection: "column",
    gap: 2,
  },
]);
