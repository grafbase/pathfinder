import { style, globalStyle } from "@pathfinder/style";

export const appContainer = style({
  display: "block",
  height: "100%",
  padding: 0,
  margin: 0,
});

globalStyle("html", {
  background: "rgb(35,35,35) !important",

  "@media": {
    "(prefers-color-scheme:dark)": {
      background: "rgba(35, 35, 35, 0.85) !important",
    },
  },
});
