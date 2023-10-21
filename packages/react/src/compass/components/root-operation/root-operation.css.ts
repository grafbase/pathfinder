import { contract, shared, style } from '@pathfinder-ide/style';

export const rootOperationClass = style([
  shared.scrollbars,
  {
    height: '100%',
    width: '100%',
    padding: contract.space[16],
    margin: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
  },
]);
