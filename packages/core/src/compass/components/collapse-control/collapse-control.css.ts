import { contract, recipe } from "@pathfinder/style";

export const collapseControlClass = recipe({
  base: {
    height: contract.space[24],
    width: contract.space[24],
    transformOrigin: "center",
  },
  variants: {
    isExpanded: {
      true: {
        transform: "rotate(90deg)",
      },
      false: {
        transform: "rotate(0deg)",
      },
    },
  },
});
