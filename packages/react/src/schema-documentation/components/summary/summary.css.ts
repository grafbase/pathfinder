import { style, contract } from '@pathfinder-ide/style';

export const summaryFieldClass = style({
  borderLeft: `1px solid ${contract.color.neutral[4]}`,
  margin: '12px 0',
  paddingLeft: 8,

  selectors: {
    '&:first-child': {
      marginTop: 0,
    },
  },
});

export const summaryTypeClass = style({
  display: 'flex',
  flexDirection: 'column',
  borderLeft: contract.color.neutral[6],
  margin: '8px 0',
});
