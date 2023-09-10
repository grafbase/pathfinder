import { GraphQLNamedType, GraphQLType, isWrappingType } from "graphql";

export const unwrapType = (type: GraphQLType): GraphQLNamedType => {
  let unwrappedType = type;
  while (isWrappingType(unwrappedType)) {
    unwrappedType = unwrappedType.ofType;
  }
  return unwrappedType;
};
