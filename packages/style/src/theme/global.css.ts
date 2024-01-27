import { globalStyle } from '@vanilla-extract/css';

import { HAIRLINE_BORDER_VAR } from '../constants';

export const globalAllCSS = globalStyle('*', {
  boxSizing: 'border-box',
});

export const globalRootCss = globalStyle(':root', {
  vars: {
    [`${HAIRLINE_BORDER_VAR}`]: '1px',
  },

  '@media': {
    '(min-resolution: 2x)': {
      vars: {
        [`${HAIRLINE_BORDER_VAR}`]: `calc(1px / 2)`,
      },
    },
    '(min-resolution: 3x)': {
      vars: {
        [`${HAIRLINE_BORDER_VAR}`]: `calc(1px / 3)`,
      },
    },
  },
});
