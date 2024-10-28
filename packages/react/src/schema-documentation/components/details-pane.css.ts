import { contract, shared, style } from '@pathfinder-ide/style';
import { sharedPaneClass } from '../shared.styles.css';

export const detailsPaneStyles = {
  container: style([
    sharedPaneClass,
    {
      display: 'flex',
      flexDirection: 'column',
      flexGrow: 1,
      height: '100%',
      overflow: 'hidden',
      fontSize: 14,
    },
  ]),

  content: style([
    shared.scrollbars,
    {
      height: '100%',
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      gap: 16,
      paddingTop: 4,
      overflow: 'auto',
      backgroundColor: contract.color.neutral[2],
    },
  ]),

  navigationControls: style({
    display: 'flex',
    borderLeft: `1px solid ${contract.color.neutral[3]}`,
    height: '100%',
    paddingRight: 12,
  }),

  leadClass: style([
    shared.hairlineBorder({
      border: 'bottom',
      onSurface: 1,
    }),
    {
      display: 'flex',
      alignItems: 'center',
      gap: 16,
      height: 40,
      paddingLeft: 12,
      boxSizing: 'border-box',
    },
  ]),

  leadInfoClass: style({
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
    paddingTop: 2,
  }),

  leadInfoSpanClass: style({
    selectors: {
      '&:nth-of-type(1)': {
        color: contract.color.neutral[12],
        fontWeight: 500,
        maxWidth: '100%',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
      },
      '&:nth-of-type(2)': {
        textTransform: 'uppercase',
        lineHeight: 1,
        fontSize: 9,
        letterSpacing: 1,
        color: contract.color.neutral[11],
        whiteSpace: 'nowrap',
      },
    },
  }),

  navButtonWrapClass: style({
    transform: `rotate(90deg)`,
    flexShrink: 0,
  }),

  tabListClass: style({
    display: 'flex',
    flexShrink: 0,
    position: 'relative',
    height: 40,
  }),

  tabButtonClass: style([
    shared.resets.buttonReset,
    {
      width: 'auto',
      position: 'relative',
      paddingBottom: 2,
      paddingLeft: contract.space[12],
      paddingRight: contract.space[12],
      textAlign: 'center',
      fontSize: 13,
      color: contract.color.neutral[9],

      selectors: {
        '&:hover': {
          color: contract.color.neutral[12],
        },

        '&:after': {
          content: '',
          position: 'absolute',
          width: `calc(100% - ${contract.space[24]})`,
          height: 2,
          bottom: 1,
          left: contract.space[12],
        },

        '&[data-headlessui-state="selected"]': {
          color: contract.color.neutral[12],
        },

        '&[data-headlessui-state="selected"]&:after': {
          backgroundColor: contract.color.green[10],
        },
      },
    },
  ]),

  tabGroupClass: style({
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  }),

  tabPanelsClass: style([
    shared.scrollbars,
    {
      height: '100%',
      overflowY: 'auto',
      overflowX: 'hidden',
    },
  ]),

  tabPanelClass: style({
    color: contract.color.neutral[7],
    position: 'relative',
    height: '100%',
  }),
};
