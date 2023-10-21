import { contract, shared, style } from '@pathfinder-ide/style';

export const historyClass = style({
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  width: '100%',
  color: contract.color.neutral[5],
});

export const historyExecutionsClass = style({
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  width: '100%',
});

export const historyListClass = style([
  shared.scrollbars,
  {
    all: 'unset',
    overflowX: 'hidden',
    overflowY: 'auto',
    height: '100%',
    margin: 0,
    padding: 0,
    display: 'flex',
    flexDirection: 'column',
  },
]);

export const historyListHeaderClass = style({
  display: 'flex',
  flexShrink: 0,
  alignItems: 'center',
  justifyContent: 'space-between',
  height: 32,
  padding: `0 ${contract.space[16]}`,
  fontSize: 12,
  color: contract.color.neutral[12],
});

export const historyNullStateClass = style({
  paddingTop: 24,
  paddingBottom: 12,
  fontSize: 12,
  width: '100%',
  textAlign: 'center',
  color: contract.color.neutral[9],
});
