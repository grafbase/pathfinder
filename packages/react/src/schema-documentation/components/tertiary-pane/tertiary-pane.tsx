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
} from '../leaf';

import { IconButton } from '../../../components/icon-button';

import { TertiaryPaneType } from '../../types';

import {
  tertiaryPaneClass,
  tertiaryPaneContentClass,
  tertiaryPaneLeadClass,
  tertiaryPaneLeadInfoClass,
  tertiaryPaneLeadInfoSpanClass,
  tertiaryPaneNavButtonWrapClass,
} from './tertiary-pane.css';

import { useSchemaDocumenationStore } from '../../store';

export const TertiaryPane = ({ pane }: { pane: TertiaryPaneType }) => {
  const activeTertiaryPane = useSchemaDocumenationStore.use.activeTertiaryPane();
  const tertiaryPaneStack = useSchemaDocumenationStore.use.tertiaryPaneStack();
  const { clearTertiaryPaneStack, navigateTertiaryPaneStack } =
    useSchemaDocumenationStore.getState();

  if (!activeTertiaryPane) {
    return null;
  }

  const indexOf = tertiaryPaneStack.indexOf(activeTertiaryPane);
  const length = tertiaryPaneStack.length;

  const canNavigateBack = length > 1 && indexOf > 0 && indexOf + 1 <= length;

  let leadType = '';
  let toRender: ReactElement = <></>;

  if (activeTertiaryPane && isNamedType(pane)) {
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

  if (activeTertiaryPane && isInterfaceType(pane)) {
    leadType = 'Interface';
    toRender = <LeafInterface int={pane} />;
  }

  if (activeTertiaryPane && isDirective(pane)) {
    leadType = 'Directive';
    toRender = <LeafDirective directive={pane} />;
  }

  if (activeTertiaryPane && 'args' in pane && !isDirective(pane)) {
    leadType = 'Field';
    toRender = <LeafField field={pane} />;
  }

  return (
    <div className={tertiaryPaneClass}>
      <div className={tertiaryPaneLeadClass}>
        <div className={tertiaryPaneLeadInfoClass}>
          <span className={tertiaryPaneLeadInfoSpanClass}>{leadType}</span>
          <span
            className={tertiaryPaneLeadInfoSpanClass}
            title={activeTertiaryPane?.pane.name}
          >
            {activeTertiaryPane?.pane.name}
          </span>
        </div>
        {canNavigateBack && (
          <div className={tertiaryPaneNavButtonWrapClass}>
            <IconButton
              action={() => {
                if (canNavigateBack) {
                  return navigateTertiaryPaneStack({
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
        <div className={tertiaryPaneNavButtonWrapClass}>
          <IconButton
            action={() => clearTertiaryPaneStack()}
            iconName="Close"
            size="large"
            title={`Close`}
          />
        </div>
      </div>
      <div className={tertiaryPaneContentClass}>{toRender}</div>
    </div>
  );
};
