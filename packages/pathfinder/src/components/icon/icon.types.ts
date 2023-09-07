import { RecipeVariants } from "@graphql-pathfinder/style";

import { Caret } from "./caret";
import { Close } from "./close";
import { Delete } from "./delete";
import { Ellipsis } from "./ellipsis";
import { Gear } from "./gear";
import { Prettier } from "./prettier";

import { iconClass } from "./icon.css";

export const IconMap = {
  Caret,
  Close,
  Delete,
  Ellipsis,
  Gear,
  Prettier,
};

type IconVariants = RecipeVariants<typeof iconClass>;

export type IconNames = keyof typeof IconMap;

export type IconProps = IconVariants & {
  name: IconNames;
};
