import { contract, shared, style } from '@pathfinder-ide/style';

export const rootOperationClass = style([
  shared.scrollbars,
  {
    height: '100%',
    width: '100%',
    overflowY: 'auto',
    contain: 'strict',
    padding: contract.space[16],
    margin: 0,
  },
]);
