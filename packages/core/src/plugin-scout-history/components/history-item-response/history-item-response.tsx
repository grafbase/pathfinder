import type { ExecutionResponse } from "@pathfinder/stores";

import { Pre } from "../../../components/pre";

import { historyItemResponseClass } from "./history-item-response.css";

export const HistoryItemResponse = ({
  historyItem,
}: {
  historyItem: ExecutionResponse;
}) => {
  return (
    <div className={historyItemResponseClass}>
      <Pre
        code={JSON.stringify(historyItem?.response.data, null, 2)}
        status={"info"}
      />
    </div>
  );
};
