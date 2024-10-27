import { contract, recipe, style } from '@pathfinder-ide/style';

export const sectionStyles = {
  container: recipe({
    base: {
      display: 'flex',
      flexDirection: 'column',
      color: contract.color.neutral[12],

      padding: 12,

      selectors: {
        '&:last-child': {
          marginBottom: 0,
        },
      },
    },

    variants: {
      withSeparator: {
        false: {},
        true: { borderBottom: `1px solid ${contract.color.neutral[2]}` },
      },
    },
  }),

  lead: style({
    display: 'flex',
    textTransform: 'uppercase',
    lineHeight: 1,
    fontSize: 9,
    fontWeight: 500,
    letterSpacing: 1,
    marginBottom: 12,
    color: contract.color.neutral[11],
  }),
};

export const enumValueClass = style({
  color: contract.color.green[10],
  marginBottom: 8,
});
