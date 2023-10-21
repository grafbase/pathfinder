import { recipe } from '@vanilla-extract/recipes';

import { contract } from '../theme';

import { HAIRLINE_BORDER_VAR } from '../constants';

type CSSVarFunction = `var(--${string})`;

const leftBorder = (value: CSSVarFunction) =>
  `inset var(${HAIRLINE_BORDER_VAR}) 0 0 ${value}`;
const topBorder = (value: CSSVarFunction) =>
  `inset 0 var(${HAIRLINE_BORDER_VAR}) 0 ${value}`;
const rightBorder = (value: CSSVarFunction) =>
  `inset calc(-1 * var(${HAIRLINE_BORDER_VAR})) 0 0 ${value}`;
const bottomBorder = (value: CSSVarFunction) =>
  `inset 0 calc(-1 * var(${HAIRLINE_BORDER_VAR})) 0 0 ${value}`;

export const hairlineBorder = recipe({
  variants: {
    border: {
      all: {},
      left: {},
      top: {},
      right: {},
      bottom: {},
    },
    onSurface: {
      1: {},
      2: {},
      3: {},
    },
  },

  compoundVariants: [
    {
      variants: {
        border: 'all',
        onSurface: 1,
      },
      style: {
        boxShadow: `
        ${leftBorder(contract.color.neutral[4])},
        ${topBorder(contract.color.neutral[4])},
        ${rightBorder(contract.color.neutral[4])},
        ${bottomBorder(contract.color.neutral[4])}`,
      },
    },
    {
      variants: {
        border: 'left',
        onSurface: 1,
      },
      style: {
        boxShadow: `${leftBorder(contract.color.neutral[4])}`,
      },
    },
    {
      variants: {
        border: 'top',
        onSurface: 1,
      },
      style: {
        boxShadow: `${topBorder(contract.color.neutral[4])}`,
      },
    },
    {
      variants: {
        border: 'right',
        onSurface: 1,
      },
      style: {
        boxShadow: `${rightBorder(contract.color.neutral[4])}`,
      },
    },
    {
      variants: {
        border: 'bottom',
        onSurface: 1,
      },
      style: {
        boxShadow: `${bottomBorder(contract.color.neutral[4])}`,
      },
    },

    {
      variants: {
        border: 'all',
        onSurface: 2,
      },
      style: {
        boxShadow: `
        ${leftBorder(contract.color.neutral[6])},
        ${topBorder(contract.color.neutral[6])},
        ${rightBorder(contract.color.neutral[6])},
        ${bottomBorder(contract.color.neutral[6])}`,
      },
    },
    {
      variants: {
        border: 'left',
        onSurface: 2,
      },
      style: {
        boxShadow: `${leftBorder(contract.color.neutral[6])}`,
      },
    },
    {
      variants: {
        border: 'top',
        onSurface: 2,
      },
      style: {
        boxShadow: `${topBorder(contract.color.neutral[6])}`,
      },
    },
    {
      variants: {
        border: 'right',
        onSurface: 2,
      },
      style: {
        boxShadow: `${rightBorder(contract.color.neutral[6])}`,
      },
    },
    {
      variants: {
        border: 'bottom',
        onSurface: 2,
      },
      style: {
        boxShadow: `${bottomBorder(contract.color.neutral[6])}`,
      },
    },

    {
      variants: {
        border: 'all',
        onSurface: 3,
      },
      style: {
        boxShadow: `
        ${leftBorder(contract.color.neutral[7])},
        ${topBorder(contract.color.neutral[7])},
        ${rightBorder(contract.color.neutral[7])},
        ${bottomBorder(contract.color.neutral[7])}`,
      },
    },
    {
      variants: {
        border: 'left',
        onSurface: 3,
      },
      style: {
        boxShadow: `${leftBorder(contract.color.neutral[7])}`,
      },
    },
    {
      variants: {
        border: 'top',
        onSurface: 3,
      },
      style: {
        boxShadow: `${topBorder(contract.color.neutral[7])}`,
      },
    },
    {
      variants: {
        border: 'right',
        onSurface: 3,
      },
      style: {
        boxShadow: `${rightBorder(contract.color.neutral[7])}`,
      },
    },
    {
      variants: {
        border: 'bottom',
        onSurface: 3,
      },
      style: {
        boxShadow: `${bottomBorder(contract.color.neutral[7])}`,
      },
    },
  ],
});
