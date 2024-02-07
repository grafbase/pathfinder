import {
  ActiveSubscriptionEntry,
  executeOperation,
  uiStore,
  useGraphQLDocumentStore,
  useSessionStore,
} from '@pathfinder-ide/stores';

import { useEffect, useState } from 'react';
import { Icon } from '../icon';
import { actionExecuteSubscriptionStyle } from './action-execute-subscription.css';
import { BeaconAnimated } from '../beacon-animated';

export const ActionExecuteSubscription = () => {
  const activeTab = useSessionStore.use.activeTab();
  const activeDocumentEntry = useGraphQLDocumentStore.use.activeDocumentEntry();

  const [isHovering, setIsHovering] = useState<boolean>(false);

  const [activeSubscription, setActiveSubscription] =
    useState<null | ActiveSubscriptionEntry>(null);

  useEffect(() => {
    uiStore.subscribe(({ activeSubscriptions }) => {
      const subscriptionForThisTab = activeSubscriptions.find(
        (s) => s.tabId === useSessionStore.getState().activeTab?.tabId,
      );
      setActiveSubscription(subscriptionForThisTab || null);
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const activeSubscriptions = uiStore.getState().activeSubscriptions;
    const subscriptionForThisTab = activeSubscriptions.find(
      (s) => s.tabId === useSessionStore.getState().activeTab?.tabId,
    );
    setActiveSubscription(subscriptionForThisTab || null);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]);

  const disposeSubscription = () => {
    // dispose the subscription
    activeSubscription?.dispose();

    // remove from local component state
    setActiveSubscription(null);

    // remove entry from activeSubscriptions
    uiStore.setState({
      activeSubscriptions: uiStore
        .getState()
        .activeSubscriptions.filter(
          (x) => x.tabId !== useSessionStore.getState().activeTab?.tabId,
        ),
    });
  };

  return (
    <button
      className={actionExecuteSubscriptionStyle.container({
        isConnected: activeSubscription ? true : false,
      })}
      onClick={() => {
        activeSubscription ? disposeSubscription() : executeOperation();
      }}
      title={activeSubscription ? 'Dispose subscription' : 'Execute subscription'}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {isHovering && activeSubscription ? (
        <Icon name="Pause" size="large" />
      ) : activeSubscription ? (
        <BeaconAnimated />
      ) : (
        <Icon name="Caret" size="large" />
      )}
      <div className={actionExecuteSubscriptionStyle.content}>
        <span
          className={actionExecuteSubscriptionStyle.span({
            isConnected: activeSubscription ? true : false,
          })}
        >
          {activeSubscription ? 'Connected' : 'Not connected'}
        </span>
        <span
          className={actionExecuteSubscriptionStyle.span({
            isConnected: activeSubscription ? true : false,
          })}
        >
          {(activeDocumentEntry && activeDocumentEntry.node.name?.value) || 'Run'}
        </span>
      </div>
    </button>
  );
};
