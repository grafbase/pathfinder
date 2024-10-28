import { ReactElement } from 'react';

import {
  isDirective,
  isEnumType,
  isInputObjectType,
  isInterfaceType,
  isNamedType,
  isObjectType,
  isScalarType,
  isUnionType,
} from 'graphql';

import {
  LeafScalar,
  LeafEnum,
  LeafInputObject,
  LeafObject,
  LeafUnion,
  LeafInterface,
  LeafDirective,
  LeafField,
} from './leaf';

import { IconButton } from '../../components/icon-button';

import { DetailsPaneTabSlotComponent, DetailsPaneType } from '../types';

import { detailsPaneStyles } from './details-pane.css';

import { useSchemaDocumentationStore } from '../store';
import { Tab } from '@headlessui/react';

export const DetailsPane = ({
  pane,
  tabSlotComponents,
}: {
  pane: DetailsPaneType;
  tabSlotComponents?: DetailsPaneTabSlotComponent[];
}) => {
  const activeDetailsPane = useSchemaDocumentationStore.use.activeDetailsPane();
  const detailsPaneStack = useSchemaDocumentationStore.use.detailsPaneStack();
  const { clearDetailsPaneStack, navigateDetailsPaneStack } =
    useSchemaDocumentationStore.getState();

  if (!activeDetailsPane) {
    return null;
  }

  const indexOf = detailsPaneStack.indexOf(activeDetailsPane);
  const length = detailsPaneStack.length;

  const canNavigateBack = length > 1 && indexOf > 0 && indexOf + 1 <= length;

  let leadType = '';
  let toRender: ReactElement = <></>;

  if (activeDetailsPane && isNamedType(pane)) {
    if (isScalarType(pane)) {
      leadType = 'Scalar';
      toRender = <LeafScalar type={pane} />;
    }
    if (isEnumType(pane)) {
      leadType = 'Enum';
      toRender = <LeafEnum type={pane} />;
    }
    if (isInputObjectType(pane)) {
      leadType = 'Input object';
      toRender = <LeafInputObject type={pane} />;
    }
    if (isObjectType(pane)) {
      leadType = 'Object';
      toRender = <LeafObject type={pane} />;
    }
    if (isUnionType(pane)) {
      leadType = 'Union';
      toRender = <LeafUnion type={pane} />;
    }
  }

  if (activeDetailsPane && isInterfaceType(pane)) {
    leadType = 'Interface';
    toRender = <LeafInterface int={pane} />;
  }

  if (activeDetailsPane && isDirective(pane)) {
    leadType = 'Directive';
    toRender = <LeafDirective directive={pane} />;
  }

  if (activeDetailsPane && 'args' in pane && !isDirective(pane)) {
    leadType = 'Field';
    toRender = <LeafField field={pane} parentType={activeDetailsPane.parentType} />;
  }

  return (
    <div className={detailsPaneStyles.container}>
      <div className={detailsPaneStyles.leadClass}>
        <div className={detailsPaneStyles.leadInfoClass}>
          <span
            className={detailsPaneStyles.leadInfoSpanClass}
            title={activeDetailsPane?.pane.name}
          >
            {activeDetailsPane?.pane.name}
          </span>
          <span className={detailsPaneStyles.leadInfoSpanClass}>{leadType}</span>
        </div>
        <div className={detailsPaneStyles.navigationControls}>
          {canNavigateBack && (
            <div className={detailsPaneStyles.navButtonWrapClass}>
              <IconButton
                action={() => {
                  if (canNavigateBack) {
                    return navigateDetailsPaneStack({
                      destinationPaneIndex: indexOf - 1,
                    });
                  }
                  return undefined;
                }}
                iconName="Chevron"
                size="large"
                title={`Navigate back`}
              />
            </div>
          )}
          <div className={detailsPaneStyles.navButtonWrapClass}>
            <IconButton
              action={() => clearDetailsPaneStack()}
              iconName="Close"
              size="large"
              title={`Close`}
            />
          </div>
        </div>
      </div>
      <Tab.Group>
        <div className={detailsPaneStyles.tabGroupClass}>
          <Tab.List>
            <div className={detailsPaneStyles.tabListClass}>
              <Tab className={detailsPaneStyles.tabButtonClass}>Details</Tab>
              {tabSlotComponents &&
                tabSlotComponents.map((tab) => (
                  <Tab key={tab.tabName} className={detailsPaneStyles.tabButtonClass}>
                    {tab.tabName}
                  </Tab>
                ))}
            </div>
          </Tab.List>
          <Tab.Panels className={detailsPaneStyles.tabPanelsClass}>
            <Tab.Panel className={detailsPaneStyles.tabPanelClass} unmount={false}>
              <div className={detailsPaneStyles.content}>{toRender}</div>
            </Tab.Panel>
            {tabSlotComponents &&
              tabSlotComponents.map((tab) => (
                <Tab.Panel
                  key={tab.tabName}
                  unmount={false}
                  className={detailsPaneStyles.tabPanelClass}
                >
                  <div className={detailsPaneStyles.content}>{tab.tabContent}</div>
                </Tab.Panel>
              ))}
          </Tab.Panels>
        </div>
      </Tab.Group>
    </div>
  );
};
