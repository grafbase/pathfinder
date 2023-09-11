import { RecipeVariants } from "@pathfinder/style";

import { Caret } from "./caret";
import { Chevron } from "./chevron";
import { Close } from "./close";
import { Delete } from "./delete";
import { Docs } from "./docs";
import { Ellipsis } from "./ellipsis";
import { Gear } from "./gear";
import { InsertNewOperation } from "./insert-new-operation";
import { Interpunct } from "./interpunct";
import { Plus } from "./plus";
import { Prettier } from "./prettier";

import { iconClass } from "./icon.css";

export const IconMap = {
  Caret,
  Chevron,
  Close,
  Delete,
  Docs,
  Ellipsis,
  Gear,
  InsertNewOperation,
  Interpunct,
  Plus,
  Prettier,
};

type IconVariants = RecipeVariants<typeof iconClass>;

export type IconNames = keyof typeof IconMap;

export type IconProps = IconVariants & {
  name: IconNames;
};
