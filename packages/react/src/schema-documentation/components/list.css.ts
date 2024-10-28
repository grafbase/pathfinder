import { contract, shared, style } from '@pathfinder-ide/style';

export const listClasses = {
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
      height: '100%',
      borderRight: `1px solid ${contract.color.neutral[2]}`,
      minWidth: 380,
    },
  ]),
};
