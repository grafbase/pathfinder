import type { RecipeVariants } from "@graphql-pathfinder/style";

import { useThemeStore } from "@graphql-pathfinder/stores";

import { spinnerInnerClass, spinnerOuterClass } from "./spinner.css";

export const Spinner = ({
  variant,
}: {
  variant: Omit<NonNullable<RecipeVariants<typeof spinnerInnerClass>>, "theme">;
}) => {
  const activeTheme = useThemeStore.use.activeTheme();
  return (
    <div className={spinnerOuterClass}>
      <div
        className={spinnerInnerClass({
          size: variant?.size,
          theme: activeTheme || "dark",
        })}
      />
    </div>
  );
};
