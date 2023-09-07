import { globalStyle } from "@vanilla-extract/css";
import { contract } from "./contract.css";

export const globalAllCSS = globalStyle("*", {
  boxSizing: "border-box",
});

export const globalBodyCSS = globalStyle("body", {
  fontFamily: contract.fonts.body,
});
