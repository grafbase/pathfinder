import { useState } from 'react';
import { printSchema } from 'graphql';

import { useSchemaStore, useThemeStore } from '@pathfinder-ide/stores';
import { RecipeVariants, shared } from '@pathfinder-ide/style';

import { Icon } from '../components';
import { ConnectionBar } from '../components/connection-bar';
import {
  SchemaDocumentation,
  useSchemaDocumentationStore,
} from '../schema-documentation';
import { SchemaView } from '../schema-view';

import { IconProps } from '../components/icon/icon.types';

import { IDE } from '../ide';

import {
  navigationButtonClass,
  navigationClass,
  navigationWrapClass,
  paneClass,
  panesWrapClass,
  referenceClass,
  referenceWrapClass,
  schemaViewWrapInnerClass,
  schemaViewWrapOuterClass,
} from './reference.css';

type AvailablePanes = 'pathfinder' | 'schema_documentation' | 'schema_view';

const panesMap: Record<AvailablePanes, string> = {
  pathfinder: 'Pathfinder',
  schema_documentation: 'Schema Documentation',
  schema_view: 'SDL',
};

const NavButton = ({
  iconName,
  paneName,
  setVisiblePane,
  visiblePane,
}: {
  iconName: IconProps['name'];
  paneName: AvailablePanes;
  setVisiblePane: React.Dispatch<React.SetStateAction<AvailablePanes>>;
  visiblePane: AvailablePanes;
}) => {
  const title = `View ${panesMap[paneName]}`;

  const clearTertiaryPaneStack =
    useSchemaDocumentationStore.getState().clearTertiaryPaneStack;

  return (
    <button
      aria-label={title}
      title={title}
      className={navigationButtonClass({
        isActive: visiblePane === paneName,
      })}
      onClick={() => {
        clearTertiaryPaneStack();
        return setVisiblePane(paneName);
      }}
    >
      <Icon name={iconName} size={'large'} />
    </button>
  );
};

export const Reference = ({
  withFetcherOptions = true,
}: {
  withFetcherOptions?: Pick<
    NonNullable<RecipeVariants<typeof referenceWrapClass>>,
    'withFetcherOptions'
  >['withFetcherOptions'];
}) => {
  const activeTheme = useThemeStore.use.activeTheme();

  const schema = useSchemaStore.use.schema();

  const [visiblePane, setVisiblePane] = useState<AvailablePanes>('pathfinder');

  if (!activeTheme) {
    return <p>Please wrap Reference with the Pathfinder component.</p>;
  }

  return (
    <div
      className={referenceWrapClass({
        withFetcherOptions,
      })}
    >
      {!withFetcherOptions && <ConnectionBar />}
      <div className={referenceClass}>
        <div
          className={`${navigationWrapClass} ${shared.hairlineBorder({
            border: 'right',
            onSurface: 1,
          })}`}
        >
          <div className={navigationClass}>
            <NavButton
              iconName="Compass"
              paneName="pathfinder"
              setVisiblePane={setVisiblePane}
              visiblePane={visiblePane}
            />
            <NavButton
              iconName="Docs"
              paneName="schema_documentation"
              setVisiblePane={setVisiblePane}
              visiblePane={visiblePane}
            />
            <NavButton
              iconName="GraphQL"
              paneName="schema_view"
              setVisiblePane={setVisiblePane}
              visiblePane={visiblePane}
            />
          </div>
        </div>
        <div className={panesWrapClass}>
          <div
            className={paneClass({
              isVisible: visiblePane === 'pathfinder',
            })}
          >
            <IDE />
          </div>
          <div
            className={paneClass({
              isVisible: visiblePane === 'schema_documentation',
            })}
          >
            {schema ? <SchemaDocumentation schema={schema} /> : <></>}
          </div>

          <div
            className={paneClass({
              isVisible: visiblePane === 'schema_view',
            })}
          >
            <div className={schemaViewWrapOuterClass}>
              <div className={schemaViewWrapInnerClass}>
                {schema ? <SchemaView schemaString={printSchema(schema)} /> : <></>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
