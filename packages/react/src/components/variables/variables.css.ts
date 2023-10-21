import { contract, style } from '@pathfinder-ide/style';

export const variablesWrapClass = style({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  height: '100%',
  padding: contract.space[12],
});

export const variablesEditorWrapClass = style({
  paddingTop: contract.space[16],
  paddingRight: contract.space[16],
  height: '100%',
});
