import { contract, recipe, style } from '@pathfinder-ide/style';

export const STATUS_VARIANTS = {
  INFO: {
    backgroundColor: contract.color.blue[10],
  },
  SUCCESS: {
    backgroundColor: contract.color.green[10],
  },
  REDIRECT: {
    backgroundColor: contract.color.yellow[10],
  },
  CLIENT_ERROR: {
    backgroundColor: contract.color.orange[10],
  },
  SERVER_ERROR: {
    backgroundColor: contract.color.red[10],
  },
  GRAPHQL_ERROR: {
    backgroundColor: contract.color.red[10],
  },
};

export const historyListItemClass = recipe({
  base: {
    all: 'unset',
    boxSizing: 'border-box',
    gridTemplateRows: 36,
    display: 'grid',
    gridTemplateColumns: '12px 1fr 1fr 1fr 32px',
    gap: 8,
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingLeft: contract.space[16],
    paddingRight: contract.space[8],
    fontSize: 12,
    fontWeight: 400,
    color: contract.color.neutral[10],
    cursor: 'pointer',

    selectors: {
      '&:last-of-type': {
        borderBottom: 'none',
      },
      '&:nth-of-type(odd)': {
        backgroundColor: contract.color.neutralAlpha[2],
      },
      '&:hover': {
        color: contract.color.neutral[12],
      },
    },
  },

  variants: {
    isActive: {
      true: {
        backgroundColor: contract.color.neutral[3],
        color: contract.color.neutral[12],
        fontWeight: 500,
        position: 'relative',

        selectors: {
          '&:after': {
            content: '',
            position: 'absolute',
            right: 1,
            top: 0,
            height: '100%',
            width: 2,
            backgroundColor: contract.color.green[10],
          },
        },
      },
      false: {},
    },
  },
});

export const historyListItemStatsSectionClass = style({
  display: 'grid',
  gridTemplateColumns: '1fr 2.5rem 3.5rem',
  justifyItems: 'flex-end',
});

export const historyListItemSectionClass = recipe({
  base: {
    display: 'flex',
    alignItems: 'center',
  },

  variants: {
    justify: {
      start: {
        justifyContent: 'flex-start',
      },
      center: {
        justifyContent: 'center',
      },
      end: {
        justifyContent: 'flex-end',
      },
    },
    gap: {
      8: {
        gap: 8,
      },
      12: {
        gap: 12,
      },
      24: {
        gap: 24,
      },
    },
  },
});

export const historyListItemSectionSpanClass = style({
  display: 'block',
  whiteSpace: 'nowrap',
  fontFamily: contract.fonts.mono,
  fontSize: 10,
});

export const historyListItemStatusIndicatorClass = style({
  height: '100%',
  width: 6,
  display: 'flex',
  alignItems: 'center',
  justifyItems: 'center',
});

export const historyListItemStatusIndicatorSpanClass = recipe({
  base: {
    display: 'block',
    height: 6,
    width: 6,
    borderRadius: '50%',
  },

  variants: {
    status: {
      ...STATUS_VARIANTS,
    },
    NETWORK_ERROR: {
      backgroundColor: contract.color.red[10],
    },
  },
});
