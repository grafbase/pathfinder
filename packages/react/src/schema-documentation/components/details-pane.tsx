import { ReactElement, ReactNode } from 'react';

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

import { DetailsPaneType } from '../types';

import { detailsPaneStyles } from './details-pane.css';

import { useSchemaDocumentationStore } from '../store';

export const DetailsPane = ({
  pane,
  fieldSlotComponent,
}: {
  pane: DetailsPaneType;
  fieldSlotComponent?: ReactNode;
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
    toRender = (
      <>
        <LeafField field={pane} />
        {fieldSlotComponent && fieldSlotComponent}
      </>
    );
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
      <div className={detailsPaneStyles.content}>{toRender}</div>
    </div>
  );
};
