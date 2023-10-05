import { useSessionStore } from "@pathfinder-ide/stores";

import { Dialog } from "@headlessui/react";

import { Connect } from "../connect/connect";
import { CompassAnimated } from "../compass-animated";

import {
  connectionBarClass,
  connectionBarContentClass,
  connectionBarDialogBackdropClass,
  connectionBarDialogClass,
} from "./connection-bar.css";

export const ConnectionBar = () => {
  const connectionDialogOpen = useSessionStore.use.connectionDialogOpen();

  //@ts-ignore
  const endpoint = useSessionStore.use.endpoint();

  return (
    <div className={connectionBarClass} data-tauri-drag-region="">
      <div
        role="button"
        className={connectionBarContentClass}
        onClick={() => useSessionStore.setState({ connectionDialogOpen: true })}
        style={{ cursor: "pointer" }}
      >
        {endpoint ? (
          endpoint
        ) : (
          <CompassAnimated size="small" speed="standard" />
        )}
      </div>

      <Dialog
        open={connectionDialogOpen}
        onClose={() =>
          useSessionStore.setState({ connectionDialogOpen: false })
        }
      >
        <div className={connectionBarDialogBackdropClass} aria-hidden="true" />

        <div className={connectionBarDialogClass}>
          <Dialog.Panel>
            <Connect />
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
};
