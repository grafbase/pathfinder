import { ReactNode } from 'react';

export type TabItem = {
  action?: () => void;
  buttonContent: () => ReactNode;
  name: string;
  panelContent: () => ReactNode;
};

export type TabsProps = TabItem[];
