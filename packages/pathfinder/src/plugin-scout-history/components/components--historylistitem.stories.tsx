import { HistoryListItem } from "./history-list-item/history-list-item";

export const FetchCacheHit = () => {
  return (
    <HistoryListItem
      item={{
        duration: 2.34543653645,
        fromCache: "HIT",
        historyItemType: "FETCH",
        source: {
          operation: "someoperationstring",
        },
        status: 200,
        timestamp: new Date(),
        viewData: "viewDataviewData",
      }}
    />
  );
};

export const FetchCacheMiss = () => {
  return (
    <HistoryListItem
      item={{
        duration: 12,
        fromCache: "MISS",
        historyItemType: "FETCH",
        source: {
          operation: "someoperationstring",
        },
        status: 200,
        timestamp: new Date(),
        viewData: "viewData",
      }}
    />
  );
};
