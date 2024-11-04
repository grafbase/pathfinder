import { contract, recipe, shared, style } from '@pathfinder-ide/style';
import { sharedPaneClass } from '../../shared.styles.css';

export const secondaryPaneClass = recipe({
  base: [
    shared.scrollbars,
    sharedPaneClass,
    {
      display: 'flex',
      flexDirection: 'column',
    },
  ],

  variants: {
    activeTertiaryPane: {
      true: {
        flexGrow: 0,
      },
    },
  },
});

export const secondaryPaneListClasses = {
  container: style({
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  }),

  searchContainer: style({}),

  searchInputWrapper: style({
    paddingBlock: contract.space[4],
    color: contract.color.neutral[11],
    fontSize: 14,
    display: 'flex',
    gap: contract.space[8],
    alignItems: 'center',
    borderBottom: `1px solid ${contract.color.neutral[9]}`,

    selectors: {
      '&:focus-within': {
        borderBottomColor: contract.color.neutral[12],
        color: contract.color.neutral[12],
      },
    },
  }),

  searchInput: style({
    background: 'transparent',
    width: '100%',
    outline: 'none',
  }),

  fieldsListContainer: style([
    shared.scrollbars,
    {
      flex: 1,
      overflowY: 'auto',
      contain: 'strict',
    },
  ]),
};
