import { Disclosure } from "@headlessui/react";

import type { ExecutionResponse } from "@pathfinder/stores";

import { Icon } from "../../../components/icon";
import { Pre } from "../pre";

import {
  disclosureButtonClass,
  historyItemRequestClass,
} from "./history-item-request.css";

export const HistoryItemRequest = ({
  historyItem,
}: {
  historyItem: ExecutionResponse;
}) => {
  return (
    <div className={historyItemRequestClass}>
      <Disclosure defaultOpen={true}>
        {({ open }) => (
          <>
            <Disclosure.Button className={disclosureButtonClass}>
              <Icon
                name="Caret"
                rotate={open ? "90" : undefined}
                size="medium"
              />
              Endpoint
            </Disclosure.Button>
            <Disclosure.Panel>
              <Pre code={historyItem.request.endpoint} />
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>

      <Disclosure defaultOpen={true}>
        {({ open }) => (
          <>
            <Disclosure.Button className={disclosureButtonClass}>
              <Icon
                name="Caret"
                rotate={open ? "90" : undefined}
                size="medium"
              />
              Operation Name
            </Disclosure.Button>
            <Disclosure.Panel>
              <Pre
                code={
                  historyItem.request.graphQLOperationParams.operationName ||
                  "Anonymous operation"
                }
              />
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>

      <Disclosure defaultOpen={true}>
        {({ open }) => (
          <>
            <Disclosure.Button className={disclosureButtonClass}>
              <Icon
                name="Caret"
                rotate={open ? "90" : undefined}
                size="medium"
              />
              Query
            </Disclosure.Button>
            <Disclosure.Panel>
              <Pre code={historyItem.request.graphQLOperationParams.query} />
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>

      <Disclosure defaultOpen={true}>
        {({ open }) => (
          <>
            <Disclosure.Button className={disclosureButtonClass}>
              <Icon
                name="Caret"
                rotate={open ? "90" : undefined}
                size="medium"
              />
              Variables
            </Disclosure.Button>
            <Disclosure.Panel>
              <Pre
                code={JSON.stringify(
                  historyItem.request.graphQLOperationParams.variables,
                  null,
                  2,
                )}
              />
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </div>
  );
};
