import type { RecipeVariants } from "@graphql-pathfinder/style";

import { Icon } from "../icon";
import { IconProps } from "../icon/icon.types";

import { buttonClass } from "./button.css";
import { forwardRef } from "react";

type ButtonVariants = RecipeVariants<typeof buttonClass>;

export type ButtonProps = ButtonVariants & {
  action?: () => void;
  copy: string;
  iconName?: IconProps["name"];
  title: string;
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      action,
      copy,
      iconName,
      isDisabled = false,
      onSurface,
      size,
      title,
      width = "fit-content",
      withBorder,
    }: ButtonProps,
    ref,
  ) => {
    return (
      <button
        // 👇 this is a recipe variant that makes styling require less lines of code
        className={buttonClass({
          isDisabled,
          onSurface,
          size,
          width,
          withBorder,
          withIcon: iconName ? true : false,
        })}
        // 👇 this is native and actually disables the onClick
        disabled={isDisabled}
        onClick={action}
        ref={ref}
        title={title}
      >
        {iconName && <Icon name={iconName} size={size} />}
        {copy}
      </button>
    );
  },
);
