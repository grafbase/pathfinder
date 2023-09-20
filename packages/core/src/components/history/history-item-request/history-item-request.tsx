import { Disclosure as HeadlessDisclosure } from "@headlessui/react";

import type { ExecutionResponse } from "@pathfinder/stores";

import { Icon } from "../../../components/icon";
import { Pre } from "../../../components/pre";

import {
  disclosureButtonClass,
  disclosurePanelClass,
  historyItemRequestClass,
} from "./history-item-request.css";

const Disclosure = ({
  buttonCopy,
  code,
}: {
  buttonCopy: string;
  code: string;
}) => {
  return (
    <HeadlessDisclosure defaultOpen={true}>
      {({ open }) => (
        <>
          <HeadlessDisclosure.Button className={disclosureButtonClass}>
            <Icon name="Caret" rotate={open ? "90" : undefined} size="small" />
            {buttonCopy}
          </HeadlessDisclosure.Button>
          <HeadlessDisclosure.Panel className={disclosurePanelClass}>
            <Pre code={code} status={"info"} />
          </HeadlessDisclosure.Panel>
        </>
      )}
    </HeadlessDisclosure>
  );
};

export const HistoryItemRequest = ({
  historyItem,
}: {
  historyItem: ExecutionResponse;
}) => {
  return (
    <div className={historyItemRequestClass}>
      <Disclosure buttonCopy="Endpoint" code={historyItem.request.endpoint} />
      <Disclosure
        buttonCopy="Operation Name"
        code={
          historyItem.request.graphQLOperationParams.operationName ||
          "Anonymous operation"
        }
      />
      <Disclosure
        buttonCopy="Query"
        code={historyItem.request.graphQLOperationParams.query}
      />
      <Disclosure
        buttonCopy="EnVariablesdpoint"
        code={JSON.stringify(
          historyItem.request.graphQLOperationParams.variables,
          null,
          2,
        )}
      />
    </div>
  );
};
