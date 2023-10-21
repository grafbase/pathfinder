import { sessionStore } from '../../../session-store';
import { HistoryActions } from '../history.types';

export const deleteFromHistory: HistoryActions['deleteFromHistory'] = ({ timestamp }) => {
  const executions = sessionStore.getState().executions;

  const filteredExecutions = executions.filter(
    (execution) => execution.timestamp !== timestamp,
  );

  return sessionStore.setState({
    executions: filteredExecutions,
  });
};
