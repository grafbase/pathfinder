export type ActiveSubscriptionEntry = {
  dispose: () => void;
  tabId: string;
  operationName: string;
};

type UIStoreState = {
  isHydrated: boolean;
  activeSubscriptions: ActiveSubscriptionEntry[];
};

export type UIStore = UIStoreState;
