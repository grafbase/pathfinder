import { contract, recipe, style } from '@pathfinder-ide/style';

export const switchClass = recipe({
  base: {
    display: 'flex',
    alignItems: 'center',
    transition: 'opacity .1s ease',
  },

  variants: {
    isDisabled: {
      true: {
        opacity: 0.35,
      },
      false: {},
    },
  },
});

export const switchInputClass = style({
  width: 0,
  height: 0,
  visibility: 'hidden',
  margin: 0,
});

export const switchLabelClass = recipe({
  base: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    cursor: 'pointer',
    position: 'relative',
    transition: 'background-color 0.2s',
  },

  variants: {
    isChecked: {
      true: {
        background: contract.color.green[10],
      },
      false: {
        background: contract.color.neutral[6],
      },
    },
    isDisabled: {
      true: {
        cursor: 'not-allowed',
        // background: contract.color.neutral[5],
      },
      false: {},
    },
    size: {
      LARGE: {
        width: 64,
        height: 32,
        borderRadius: 32,
      },
      MEDIUM: {
        width: 48,
        height: 24,
        borderRadius: 24,
      },
      SMALL: {
        width: 38,
        height: 18,
        borderRadius: 18,
      },
    },
  },
});

export const switchLabelSpanClass = recipe({
  base: {
    display: 'block',
    position: 'absolute',
    top: 2,
    left: 2,
    background: contract.color.neutral[2],
    boxShadow: `0 0 2px 0 ${contract.color.neutral[4]}`,
    transition: 'all 0.15s',
  },
  variants: {
    isChecked: {
      false: {
        background: contract.color.neutral[11],
      },
      true: {
        background: contract.color.neutral[12],
        left: 'calc(100% - 2px) !important',
        transform: 'translateX(-100%) !important',
      },
    },
    size: {
      LARGE: {
        width: 28,
        height: 28,
        borderRadius: 14,
      },
      MEDIUM: {
        width: 20,
        height: 20,
        borderRadius: 10,
      },
      SMALL: {
        width: 14,
        height: 14,
        top: 2,
        left: 2,
        borderRadius: 7,
      },
    },
  },
});
