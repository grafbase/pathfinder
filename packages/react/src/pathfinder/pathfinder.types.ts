import type {
  HTTPHeaderValue,
  SchemaStoreState,
  ThemeOptions,
} from '@pathfinder-ide/stores';

export type PathfinderProps = {
  mode?: 'FULL' | 'MINI';
  fetcherOptions?: {
    endpoint: string;
    headers?: Pick<HTTPHeaderValue, 'key' | 'value'>[];
  };
  schemaPollingOptions?: Partial<
    Pick<SchemaStoreState['polling'], 'enabled' | 'interval'>
  >;
  themeOptions?: Partial<ThemeOptions>;
};
