import { contract, recipe, shared, style } from '@pathfinder-ide/style';

export const quickDocsClass = recipe({
  base: [
    shared.scrollbars,
    {
      backgroundColor: contract.color.neutral[3],
      border: `1px solid ${contract.color.neutral[5]}`,
      paddingBottom: contract.space[12],
      borderRadius: contract.space[4],
      position: 'absolute',
      top: contract.space[12],
      left: contract.space[12],
      overflowY: 'auto',
      height: `calc(100% - ${contract.space[24]})`,
      width: `calc(100% - ${contract.space[24]})`,
      transition: `all .15s ${shared.transitions.authenticMotion}`,
    },
  ],

  variants: {
    dialogActive: {
      true: {
        visibility: 'visible',
        opacity: '1',
        transform: 'scale(1)',
      },
      false: {
        visibility: 'hidden',
        opacity: '0',
        transform: 'scale(0.96)',
      },
    },
  },
});

export const quickDocsPortalContainerClass = style({
  position: 'relative',
  height: '100%',
  width: '100%',
});

export const quickDocsDialogRootClass = style({
  position: 'relative',
  height: '100%',
  width: '100%',
});

export const quickDocsDialogContentClass = style({
  position: 'absolute',
  top: 0,
  left: 0,
  height: '100%',
  width: '100%',
});
