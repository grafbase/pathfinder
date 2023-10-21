import { GraphQLScalarType } from 'graphql';

export const dateScalar = new GraphQLScalarType({
  name: 'Date',
  description: 'Date custom scalar type',
});

export const dateTimeScalar = new GraphQLScalarType({
  name: 'DateTime',
  description: 'DateTime custom scalar type',
});

export const emailScalar = new GraphQLScalarType({
  name: 'Email',
  description: 'Email custom scalar type',
});

export const ipAddressScalar = new GraphQLScalarType({
  name: 'IPAddress',
  description: 'IPAddress custom scalar type',
});

export const timestampScalar = new GraphQLScalarType({
  name: 'Timestamp',
  description: 'Timestamp custom scalar type',
});

export const urlScalar = new GraphQLScalarType({
  name: 'URL',
  description: 'URL custom scalar type',
});

export const jsonScalar = new GraphQLScalarType({
  name: 'JSON',
  description: 'JSON custom scalar type',
});

export const phoneNumberScalar = new GraphQLScalarType({
  name: 'PhoneNumber',
  description: 'PhoneNumber custom scalar type',
});
