import {
  GraphQLDirective,
  GraphQLEnumType,
  GraphQLField,
  GraphQLInputField,
  GraphQLInputObjectType,
  GraphQLInterfaceType,
  GraphQLNamedType,
  GraphQLObjectType,
  GraphQLScalarType,
  GraphQLUnionType,
} from 'graphql';

export type SortedTypeMap = {
  Scalars: GraphQLScalarType[];
  Enums: GraphQLEnumType[];
  Objects: GraphQLObjectType[];
  'Input Objects': GraphQLInputObjectType[];
  Unions: GraphQLUnionType[];
  Interfaces: GraphQLInterfaceType[];
};

export type TertiaryPaneType =
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  | GraphQLField<any, any>
  | GraphQLNamedType
  | GraphQLDirective
  | GraphQLInterfaceType
  | GraphQLInputField;
