import {
  GraphQLEnumType,
  GraphQLInputObjectType,
  GraphQLInterfaceType,
  GraphQLNamedType,
  GraphQLObjectType,
  GraphQLScalarType,
  GraphQLUnionType,
  isEnumType,
  isInputObjectType,
  isInterfaceType,
  isObjectType,
  isScalarType,
  isUnionType,
} from 'graphql';

import { ObjMap } from 'graphql/jsutils/ObjMap';

import { SortedTypeMap } from '../types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const sortTypes = ({ typeMap }: { typeMap: ObjMap<GraphQLNamedType> }) => {
  const result: SortedTypeMap = {
    Objects: [],
    'Input Objects': [],
    Scalars: [],
    Enums: [],
    Unions: [],
    Interfaces: [],
  };

  Object.keys(typeMap).forEach((d) => {
    // bypass introspection types
    if (d.startsWith('__')) {
      return null;
    }
    if (isScalarType(typeMap[d])) {
      result.Scalars.push(typeMap[d] as GraphQLScalarType);
    }
    if (isEnumType(typeMap[d])) {
      result.Enums.push(typeMap[d] as GraphQLEnumType);
    }
    if (isObjectType(typeMap[d])) {
      result.Objects.push(typeMap[d] as GraphQLObjectType);
    }
    if (isInputObjectType(typeMap[d])) {
      result['Input Objects'].push(typeMap[d] as GraphQLInputObjectType);
    }
    if (isUnionType(typeMap[d])) {
      result.Unions.push(typeMap[d] as GraphQLUnionType);
    }
    if (isInterfaceType(typeMap[d])) {
      result.Interfaces.push(typeMap[d] as GraphQLInterfaceType);
    }
    return null;
  });

  return result;
};
