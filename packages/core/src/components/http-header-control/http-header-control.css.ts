import { contract, recipe, shared, style } from "@pathfinder/style";

export const headerControlWrapClass = recipe({
  base: {
    display: "flex",
    flexDirection: "column",
    gap: contract.space[12],
  },

  variants: {
    placement: {
      IN_APP: {
        padding: `${contract.space[24]} ${contract.space[16]} 0`,
      },
      WELCOME_SCREEN: {
        padding: 0,
      },
    },
  },
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

export const headerControlClass = recipe({
  base: {
    display: "grid",
    alignItems: "center",
    justifyContent: "center",
    gap: contract.space[12],
  },

  variants: {
    placement: {
      IN_APP: {
        gridTemplateColumns: `48px 0.4fr 0.6fr ${contract.space[24]}`,
      },
      WELCOME_SCREEN: {
        gridTemplateColumns: "1fr 1fr",
      },
    },
  },
});

export const headerControlsClass = style({
  display: `flex`,
  flexDirection: `column`,
  gap: contract.space[12],
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
