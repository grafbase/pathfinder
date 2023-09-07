import { Icon } from "../icon";
import type { IconNames } from "../icon";
import { iconButtonClass } from "./icon-button.css";
import { RecipeVariants } from "@graphql-pathfinder/style";

type IconButtonVariants = RecipeVariants<typeof iconButtonClass>;

export type IconButtonProps = IconButtonVariants & {
  action?: () => void;
  iconName: IconNames;
  title: string;
};

export const IconButton = ({
  action,
  iconName,
  isActive = false,
  isDisabled = false,
  onSurface = 1,
  size = "small",
  title,
}: IconButtonProps) => {
  return (
    <button
      className={iconButtonClass({
        isActive,
        isDisabled,
        onSurface,
        size,
      })}
      aria-label={title}
      disabled={isDisabled}
      onClick={action}
      title={title}
    >
      <Icon name={iconName} size={size} />
    </button>
  );
};
