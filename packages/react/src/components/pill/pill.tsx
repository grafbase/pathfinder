import { pillClass } from "./pill.css";

import type { RecipeVariants } from "@pathfinder-ide/style";

export type PillProps = {
  copy: string;
  variant: RecipeVariants<typeof pillClass>;
};

export const Pill = ({ copy, variant }: PillProps) => {
  return (
    <span
      className={pillClass({
        color: variant?.color,
      })}
    >
      {copy}
    </span>
  );
};
