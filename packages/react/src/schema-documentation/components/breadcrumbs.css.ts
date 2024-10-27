import { style, shared, contract } from '@pathfinder-ide/style';
import { buttonReset } from '@pathfinder-ide/style/src/shared/resets.css';

export const breadcrumbsStyles = {
  container: style([
    shared.hairlineBorder({
      border: 'bottom',
      onSurface: 1,
    }),
    {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      flexGrow: 0,
      flexShrink: 0,
      color: contract.color.neutral[11],
      paddingLeft: 12,
      paddingRight: 12,
      height: 40,
      width: '100%',
    },
  ]),

  button: style([
    buttonReset,
    {
      display: 'flex',
      gap: 8,

      selectors: {
        '&:hover': {
          color: contract.color.neutral[12],
        },
      },
    },
  ]),
};
