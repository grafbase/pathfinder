import { useSessionStore } from "@pathfinder/stores";

import { Dialog } from "@headlessui/react";

import { IconButton } from "../icon-button";
import { Connect } from "../connect/connect";
import { CompassAnimated } from "../compass-animated";

import {
  connectionBarClass,
  connectionBarContentClass,
  connectionBarContentIconClass,
  connectionBarDialogBackdropClass,
  connectionBarDialogClass,
} from "./connection-bar.css";

export const ConnectionBar = () => {
  const connectionDialogOpen = useSessionStore.use.connectionDialogOpen();

  //@ts-ignore
  const endpoint = useSessionStore.use.endpoint();

  return (
    <div className={connectionBarClass}>
      <div className={connectionBarContentClass}>
        {endpoint ? (
          endpoint
        ) : (
          <CompassAnimated size="small" speed="standard" />
        )}
        <div className={connectionBarContentIconClass}>
          <IconButton
            action={() =>
              useSessionStore.setState({ connectionDialogOpen: true })
            }
            iconName="Gear"
            title="Open Connection Settings dialog"
            size="medium"
          />
        </div>
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
