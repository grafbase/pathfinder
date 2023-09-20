import { sessionStore } from "../../../session-store";
import { HistoryActions } from "../history.types";

export const clearHistory: HistoryActions["clearHistory"] = () => {
  sessionStore.setState({
    executions: [],
  });
};
