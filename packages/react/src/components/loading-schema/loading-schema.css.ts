import { contract, style } from '@pathfinder-ide/style';

export const loadingSchemaClass = style({
  height: '100%',
  width: '100%',
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 12,
  color: contract.color.neutral[11],
  fontFamily: contract.fonts.mono,
  fontSize: 12,
});
