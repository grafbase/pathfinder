import { AvailableResizers } from './resizer-store/resizer-store.types';

export type ResizerOrientation = 'HORIZONTAL' | 'VERTICAL';

export type ResizerInitialSize =
  | { type: 'PIXELS'; value: number }
  | { type: 'PERCENT'; value: number };

export type ResizerProps = {
  resizerName: AvailableResizers;
  onSurface: 1 | 2 | 3;
  orientation: ResizerOrientation;
  pane1: {
    component: React.ReactElement;
    minimumSize?: number;
  };
  pane2: {
    component: React.ReactElement;
    initialSize: ResizerInitialSize;
    minimumSize?: number;
  };
};
