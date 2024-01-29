import { deleteFromHistory, type ExecutionResponse } from '@pathfinder-ide/stores';

import { Dropdown, Pill } from '../../../components';
import { PillProps } from '../../../components/pill';

import {
  historyListItemClass,
  historyListItemSectionClass,
  historyListItemSectionSpanClass,
  historyListItemStatsSectionClass,
  historyListItemStatusIndicatorClass,
  historyListItemStatusIndicatorSpanClass,
  STATUS_VARIANTS,
} from './history-list-item.css';

const determineStatusClassName = ({
  status,
}: {
  status: Response['status'];
}): keyof typeof STATUS_VARIANTS => {
  const str = status.toString();
  if (str.startsWith('1')) {
    return 'INFO';
  }
  if (str.startsWith('2')) {
    return 'SUCCESS';
  }
  if (str.startsWith('3')) {
    return 'REDIRECT';
  }
  if (str.startsWith('4')) {
    return 'CLIENT_ERROR';
  }
  return 'SERVER_ERROR';
};

const operationTypePill = ({
  operationString,
}: {
  operationString: string;
}): PillProps => {
  if (operationString.startsWith('m')) {
    return {
      copy: 'M',
      variant: { color: 'purple' },
    };
  }
  if (operationString.startsWith('s')) {
    return {
      copy: 'S',
      variant: { color: 'orange' },
    };
  }
  return {
    copy: 'Q',
    variant: { color: 'blue' },
  };
};

export const HistoryListItem = ({
  action,
  activeItemTimestamp,
  item,
}: {
  action: () => void;
  activeItemTimestamp: Date;
  item: ExecutionResponse;
}) => {
  return (
    <li
      className={historyListItemClass({
        isActive: activeItemTimestamp === item.timestamp,
      })}
      onClick={() => action()}
    >
      <div className={historyListItemStatusIndicatorClass}>
        <span
          className={historyListItemStatusIndicatorSpanClass({
            status:
              'errors' in item.response.data
                ? 'GRAPHQL_ERROR'
                : determineStatusClassName({
                    status: item.response.status,
                  }),
          })}
        ></span>
      </div>
      <div className={historyListItemSectionClass({ gap: 8, justify: 'start' })}>
        <Pill
          {...operationTypePill({
            operationString: item.request.graphQLOperationParams.query,
          })}
        />
        {item.request.graphQLOperationParams.operationName || (
          <Pill copy={'Anonymous operation'} variant={{ color: 'neutral' }} />
        )}
      </div>
      <div className={historyListItemSectionClass({ gap: 8, justify: 'end' })}>
        {'errors' in item.response.data && (
          <Pill copy={'Graphql Error'} variant={{ color: 'red' }} />
        )}
        {item.watchHeaders &&
          item.watchHeaders.length > 0 &&
          item.watchHeaders.map(
            (watchHeader) =>
              watchHeader &&
              watchHeader.value && (
                <Pill
                  key={watchHeader.value}
                  copy={watchHeader.value}
                  variant={{ color: watchHeader.color }}
                />
              ),
          )}
      </div>
      <div className={historyListItemStatsSectionClass}>
        <span className={historyListItemSectionSpanClass}>
          {item.timestamp.toLocaleString()}
        </span>

        <span className={historyListItemSectionSpanClass}>
          {`${Math.round(item.duration)}ms`}
        </span>

        <span className={historyListItemSectionSpanClass}>
          {`${new TextEncoder().encode(JSON.stringify(item.response.data)).length}B`}
        </span>
      </div>
      <div className={historyListItemSectionClass({ gap: 12 })}>
        <Dropdown
          buttons={[
            {
              action: () => {
                deleteFromHistory({ timestamp: item.timestamp });
              },
              copy: 'Delete item from history',
              iconName: 'Delete',
              onSurface: 3,
              size: 'small',
              title: 'Delete item from history',
              width: '100%',
              withBorder: false,
            },
          ]}
          iconButtonProps={{
            iconName: 'Ellipsis',
            onSurface: 2,
            size: 'small',
            title: 'Execution item options',
          }}
        />
      </div>
    </li>
  );
};
