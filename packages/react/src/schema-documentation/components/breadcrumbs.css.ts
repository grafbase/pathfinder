import { style, shared, contract } from '@pathfinder-ide/style';

export const breadcrumbsStyles = {
  container: style([
    shared.hairlineBorder({
      border: 'bottom',
      onSurface: 1,
    }),
    {
      display: 'flex',
      alignItems: 'center',
      flexGrow: 0,
      flexShrink: 0,
      color: contract.color.neutral[11],
      paddingLeft: 24,
      paddingRight: 24,
      height: 40,
      width: '100%',
    },
  ]),

  arrow: style({
    display: 'flex',
    paddingLeft: 8,
    paddingRight: 8,
  }),

  item: style({
    display: 'flex',
    gap: 2,
  }),
};
