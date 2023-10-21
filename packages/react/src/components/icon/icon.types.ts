import { RecipeVariants } from '@pathfinder-ide/style';

import { Caret } from './caret';
import { Chevron } from './chevron';
import { Close } from './close';
import { Compass } from './compass';
import { Delete } from './delete';
import { Docs } from './docs';
import { Ellipsis } from './ellipsis';
import { Gear } from './gear';
import { GraphQL } from './graphql';
import { InsertNewOperation } from './insert-new-operation';
import { Interpunct } from './interpunct';
import { Plus } from './plus';
import { Prettier } from './prettier';

import { iconClass } from './icon.css';

export const IconMap = {
  Caret,
  Chevron,
  Close,
  Compass,
  Delete,
  Docs,
  Ellipsis,
  Gear,
  GraphQL,
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
