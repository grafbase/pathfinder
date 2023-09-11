import { contract, recipe } from "@pathfinder/style";

export const collapseControlClass = recipe({
  base: {
    height: contract.space[20],
    width: contract.space[20],
    transformOrigin: "center",
  },
  variants: {
    isExpanded: {
      true: {
        transform: "rotate(0deg)",
      },
      false: {
        transform: "rotate(-90deg)",
      },
    },
  },
});
