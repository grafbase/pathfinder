import type {
  GraphQLArgument,
  GraphQLField,
  GraphQLInputObjectType,
  GraphQLObjectType,
} from 'graphql';

import type { AncestorsArray } from '../../compass-store';

export type ListItemVariants = 'FIELD' | 'INLINE_FRAGMENT' | 'INPUT_OBJECT' | 'ARGUMENT';

export type ListItemTypeTypes =
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  GraphQLField<any, any> | GraphQLArgument | GraphQLInputObjectType | GraphQLObjectType;

type ListItemBaseProps = {
  ancestors: AncestorsArray;
  isSelected: boolean;
  type: ListItemTypeTypes;
  variant: ListItemVariants;
};

type ListItemWithCollapserProps = {
  collapsibleContent?: {
    arguments?: React.ReactNode;
    childFields?: React.ReactNode;
  };
};

export type ListItemProps = ListItemBaseProps & ListItemWithCollapserProps;
