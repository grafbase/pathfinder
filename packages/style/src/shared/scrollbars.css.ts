import { style } from "@vanilla-extract/css";
import { contract } from "../theme";

export const scrollbars = style({
  // firefox
  scrollbarWidth: "thin",
  scrollbarColor: `${contract.color.neutral[7]} transparent`,

  selectors: {
    // Chrome, Edge, and Safari
    "&::-webkit-scrollbar": {
      width: 2,
      height: 2,
    },
    "&::-webkit-scrollbar-track": {
      background: "transparent",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: contract.color.neutral[7],
      borderRadius: 4,
    },
  },
});
