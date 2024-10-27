import { style, contract } from '@pathfinder-ide/style';

export const listItemFieldClass = style({
  borderLeft: `1px solid ${contract.color.neutral[4]}`,
  margin: '12px 0',
  paddingLeft: 8,

  selectors: {
    '&:first-child': {
      marginTop: 0,
    },
  },
});

export const listItemTypeClass = style({
  display: 'flex',
  flexDirection: 'column',
  minHeight: 28,
});
