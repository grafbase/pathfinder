import { STORAGE_NAME_SESSION } from "@pathfinder/shared";

import { loadSession, useSessionStore } from "@pathfinder/stores";

import { sessionsClass, sessionSelectButtonClass } from "./sessions.css";

export const Sessions = ({ sessionNames }: { sessionNames: string[] }) => {
  return (
    <div className={sessionsClass}>
      {sessionNames.map((sessionName, i) => (
        <button
          key={i}
          className={sessionSelectButtonClass}
          onClick={async () => {
            loadSession({ sessionName });
            useSessionStore.setState({ connectionDialogOpen: false });
          }}
        >
          {sessionName.split(`${STORAGE_NAME_SESSION}-`)[1]}
        </button>
      ))}
    </div>
  );
};
