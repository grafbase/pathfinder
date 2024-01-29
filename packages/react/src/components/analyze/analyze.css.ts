import { contract, recipe, shared, style } from '@pathfinder-ide/style';

export const analyzeClass = style({
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-end',
  position: 'relative',
  paddingRight: contract.space[12],
  paddingLeft: contract.space[12],
});

export const responseEditorClass = recipe({
  base: {
    transition: `opacity .10s ${shared.transitions.authenticMotion}`,
    marginLeft: -8,
  },

  variants: {
    hideResponseEditor: {
      true: {
        visibility: 'hidden',
        opacity: 0,
        height: 0,
        padding: 0,
      },
      false: {
        visibility: 'visible',
        opacity: 1,
        overflowY: 'auto',
        height: '100%',
        position: 'relative',
        paddingTop: contract.space[12],
        paddingRight: contract.space[12],
        paddingBottom: contract.space[12],
      },
    },
    isExecuting: {
      true: { opacity: '0.25 !important' },
      false: { opacity: '1 !important' },
    },
  },
});

export const responseNullStateClass = style({
  height: '100%',
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: contract.space[16],
  color: contract.color.neutral[6],
  fontSize: 14,
  cursor: 'default',
});

export const latestResponseClass = style({
  display: 'flex',
  gap: 12,
  color: contract.color.neutral[11],
  fontSize: 12,
  fontFamily: contract.fonts.mono,
});
