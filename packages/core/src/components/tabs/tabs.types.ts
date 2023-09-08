export type TabItem = {
  action?: () => void;
  buttonContent: React.ElementType;
  name: string;
  panelContent: React.ElementType;
};

export type TabsProps = TabItem[];
