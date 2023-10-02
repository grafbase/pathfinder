import { contract, recipe, shared, style } from "@pathfinder/style";

export const headerControlWrapClass = style({
  display: "flex",
  flexDirection: "column",
  gap: contract.space[12],
});

export const removeHeaderButtonWrapClass = recipe({
  base: {},
  variants: {
    withLabel: {
      true: {
        marginTop: 16,
      },
      false: {
        marginTop: 0,
      },
    },
  },
});

export const headerControlClass = style({
  display: "grid",
  alignItems: "center",
  justifyContent: "center",
  gap: contract.space[12],
});

export const headerControlsClass = style({
  display: "flex",
  flexDirection: "column",
  gap: contract.space[12],
});

export const headerControlsSwitchWrapClass = recipe({
  base: {},
  variants: {
    hasLabel: {
      true: {
        marginTop: 16,
      },
      false: {},
    },
  },
  // display: "flex",
  // flexDirection: "column",
  // gap: contract.space[12],
});

export const addHeaderButtonWrapClass = style([
  shared.resets.buttonReset,
  {
    width: "fit-content",
    color: contract.color.neutral[12],
    fontSize: 12,
    marginTop: contract.space[12],
    textDecoration: "underline",
  },
]);
