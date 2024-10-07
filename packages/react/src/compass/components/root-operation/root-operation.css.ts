import { contract, shared, style } from '@pathfinder-ide/style';

export const rootOperationStyles = {
  container: style({
    width: '100%',
    height: '100%',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    gap: contract.space[16],
    paddingBlock: contract.space[16],
  }),

  searchContainer: style({
    paddingInline: contract.space[16],
    paddingBlockStart: contract.space[16],
  }),

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

  operationsListContainer: style([
    shared.scrollbars,
    {
      flex: 1,
      overflowY: 'auto',
      contain: 'strict',
      paddingBlockEnd: contract.space[16],
      paddingInlineStart: contract.space[16],
    },
  ]),
};
