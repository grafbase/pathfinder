import type { ThemeOptions } from '@pathfinder-ide/stores';
import { GraphQLSchema } from 'graphql';

export type SharedComponentProps = {
  schema?: GraphQLSchema;
  themeOptions?: Partial<ThemeOptions>;
};
