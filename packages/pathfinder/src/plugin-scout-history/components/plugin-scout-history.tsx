import { usePluginHistoryStore } from "../store";

import { History } from "./history";

export const PluginScoutHistory = () => {
  const executions = usePluginHistoryStore.use.executions();
  return <History historyItems={executions} />;
};
