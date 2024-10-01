import { contract, shared, style } from '@pathfinder-ide/style';

export const sectionClass = style({
  display: 'flex',
  flexDirection: 'column',
  marginBottom: 24,
  color: contract.color.neutral[12],

  selectors: {
    '&:last-child': {
      marginBottom: 0,
    },
  },
});

export const sectionLeadClass = style({
  display: 'flex',
  textTransform: 'uppercase',
  lineHeight: 1,
  fontSize: 10,
  letterSpacing: 0.5,
  marginBottom: 12,
  color: contract.color.neutral[11],
});

export const enumValueClass = style({
  color: contract.color.green[10],
  marginBottom: 8,
});

export const sectionFieldsClasses = {
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
