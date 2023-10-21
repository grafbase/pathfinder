import type { RecipeVariants } from '@pathfinder-ide/style';

import { useThemeStore } from '@pathfinder-ide/stores';

import { spinnerInnerClass, spinnerOuterClass } from './spinner.css';

export const Spinner = ({
  variant,
}: {
  variant: Omit<NonNullable<RecipeVariants<typeof spinnerInnerClass>>, 'theme'>;
}) => {
  const activeTheme = useThemeStore.use.activeTheme();
  return (
    <div className={spinnerOuterClass}>
      <div
        className={spinnerInnerClass({
          size: variant?.size,
          theme: activeTheme || 'dark',
        })}
      />
    </div>
  );
};
