import { Menu } from "@headlessui/react";

import { Button, ButtonProps } from "../button";
import { IconButton, IconButtonProps } from "../icon-button";

import { menuClass, menuItemsClass, menuButtonWrapClass } from "./dropdown.css";

type DropdownProps = {
  buttons: Array<ButtonProps>;
  iconButtonProps: Pick<
    IconButtonProps,
    "iconName" | "size" | "onSurface" | "title"
  >;
};

export const Dropdown = ({ buttons, iconButtonProps }: DropdownProps) => {
  return (
    <Menu>
      {({ open }) => (
        <div className={menuClass}>
          <Menu.Button as={"div"} className={menuButtonWrapClass}>
            <IconButton
              iconName={iconButtonProps.iconName}
              isActive={open === true}
              onSurface={iconButtonProps.onSurface}
              size={iconButtonProps.size}
              title={iconButtonProps.title}
            />
          </Menu.Button>

          <Menu.Items
            className={menuItemsClass({ size: iconButtonProps.size })}
          >
            {buttons.map((button, index) => {
              return (
                <Menu.Item key={index}>
                  {({ close }) => (
                    <Button
                      {...button}
                      action={() => {
                        button.action && button.action();
                        close();
                      }}
                    />
                  )}
                </Menu.Item>
              );
            })}
          </Menu.Items>
        </div>
      )}
    </Menu>
  );
};
