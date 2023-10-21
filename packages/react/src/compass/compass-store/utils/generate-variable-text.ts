import type { GraphQLArgument } from 'graphql';

export const generateVariableText = ({ argument }: { argument: GraphQLArgument }) =>
  `$${argument.name}: ${argument.type.toString()}`;
