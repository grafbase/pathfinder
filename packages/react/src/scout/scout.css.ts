import { contract, style } from '@pathfinder-ide/style';

export const scoutClass = style({
  height: '100%',
  width: '100%',
  display: 'flex',
  backgroundColor: contract.color.neutral[1],
  fontFamily: contract.fonts.body,
  color: contract.color.neutral[12],
});

export const scoutEditorWrapClass = style({
  height: '100%',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
});
