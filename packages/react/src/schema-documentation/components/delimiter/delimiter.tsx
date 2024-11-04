import type { RecipeVariants } from '@pathfinder-ide/style';

import { delimiterClass } from './delimiter.css';

export const Delimiter = ({
  spacing,
  value,
}: {
  spacing: Pick<NonNullable<RecipeVariants<typeof delimiterClass>>, 'spacing'>['spacing'];
  value: ':' | '(' | ')';
}) => {
  return <span className={delimiterClass({ spacing })}>{value}</span>;
};
