import type { HTTPHeaderValue, SchemaStoreState } from '@pathfinder-ide/stores';
import { SharedComponentProps } from '../types';

export type PathfinderProps = SharedComponentProps & {
  mode?: 'IDE' | 'SCOUT' | 'REFERENCE';
  fetcherOptions?: {
    endpoint: string;
    headers?: Pick<HTTPHeaderValue, 'key' | 'value'>[];
  };
  schemaPollingOptions?: Partial<
    Pick<SchemaStoreState['polling'], 'enabled' | 'interval'>
  >;
};
