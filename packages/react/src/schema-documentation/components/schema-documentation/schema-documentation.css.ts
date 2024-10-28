import { style, shared, contract } from '@pathfinder-ide/style';

export const schemaDocumentationStyles = {
  container: style([
    shared.scrollbars,
    {
      color: contract.color.neutral[10],
      height: '100%',
      width: '100%',
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      fontSize: 14,
      backgroundColor: contract.color.neutral[1],
      fontFamily: contract.fonts.body,

      MozOsxFontSmoothing: 'grayscale',
      WebkitFontSmoothing: 'antialiased',
      textRendering: 'optimizeLegibility',
    },
  ]),

  list: style({
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
  }),
};

export const panesClass = style({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
});
