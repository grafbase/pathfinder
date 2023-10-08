import { useState } from "react";

import { useSchemaStore, useThemeStore } from "@pathfinder-ide/stores";
import { RecipeVariants, shared } from "@pathfinder-ide/style";

import { Compass } from "../compass";
import { Icon, Resizer } from "../components";
import { ConnectionBar } from "../components/connection-bar";
import { SchemaDocumentation } from "../schema-documentation";
import { SchemaView } from "../schema-view";
import { Scout } from "../scout";

import {
  navigationButtonClass,
  navigationClass,
  navigationWrapClass,
  paneClass,
  panesWrapClass,
  ideClass,
  ideWrapClass,
} from "./ide.css";

export const IDE = ({
  withFetcherOptions = true,
}: {
  withFetcherOptions?: Pick<
    NonNullable<RecipeVariants<typeof ideWrapClass>>,
    "withFetcherOptions"
  >["withFetcherOptions"];
}) => {
  const activeTheme = useThemeStore.use.activeTheme();

  const schema = useSchemaStore.use.schema();

  const [visiblePane, setVisiblePane] = useState<string | null>("pathfinder");

  if (!activeTheme) {
    return <p>Please wrap IDE with the Pathfinder component.</p>;
  }

  return (
    <div
      className={ideWrapClass({
        withFetcherOptions,
      })}
    >
      {!withFetcherOptions && <ConnectionBar />}
      <div className={ideClass}>
        <div
          className={`${navigationWrapClass} ${shared.hairlineBorder({
            border: "right",
            onSurface: 1,
          })}`}
        >
          <div className={navigationClass}>
            <button
              className={navigationButtonClass({
                isActive: visiblePane === "pathfinder",
              })}
              onClick={() => setVisiblePane("pathfinder")}
            >
              <Icon name={"Compass"} size={"large"} />
            </button>
            <button
              className={navigationButtonClass({
                isActive: visiblePane === "schema_documentation",
              })}
              onClick={() => setVisiblePane("schema_documentation")}
            >
              <Icon name={"Docs"} size={"large"} />
            </button>
            <button
              className={navigationButtonClass({
                isActive: visiblePane === "schema_view",
              })}
              onClick={() => setVisiblePane("schema_view")}
            >
              <Icon name={"GraphQL"} size={"large"} />
            </button>
          </div>
        </div>
        <div className={panesWrapClass}>
          <div
            className={paneClass({
              isVisible: visiblePane === "pathfinder",
            })}
          >
            <Resizer
              onSurface={1}
              orientation="HORIZONTAL"
              pane1={{
                component: <Compass />,
              }}
              pane2={{
                component: <Scout />,
                initialSize: { type: "PERCENT", value: 70 },
              }}
            />
          </div>
          <div
            className={paneClass({
              isVisible: visiblePane === "schema_documentation",
            })}
          >
            {schema ? <SchemaDocumentation schema={schema} /> : <></>}
          </div>

          <div
            className={paneClass({
              isVisible: visiblePane === "schema_view",
            })}
          >
            {schema ? <SchemaView schema={schema} /> : <></>}
          </div>
        </div>
      </div>
    </div>
  );
};
