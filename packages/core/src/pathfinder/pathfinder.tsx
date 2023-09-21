import { useState } from "react";

import { usePluginsStore, useThemeStore } from "@pathfinder/stores";
import { shared } from "@pathfinder/style";

import { SchemaDocumentation } from "../schema-documentation";

import { Compass } from "../compass";
import { Icon, Resizer } from "../components";
import { Scout } from "../scout";

import {
  pathfinderClass,
  pathfinderPluginNavigationClass,
  pathfinderPluginNavigationWrapClass,
  pathfinderWrapClass,
  schemaAwarePluginButtonClass,
  schemaAwarePluginClass,
  schemaAwarePluginsWrapClass,
} from "./pathfinder.css";
import { ConnectionBar } from "../components/connection-bar";

export const Pathfinder = ({
  withSchemaProps = true,
}: {
  withSchemaProps?: boolean;
}) => {
  const activeTheme = useThemeStore.use.activeTheme();

  const schemaAwarePlugins = usePluginsStore.getState().schemaAwarePlugins;

  const [visibleSchemaAwarePlugin, setVisibleSchemaAwarePlugin] = useState<
    string | null
  >("pathfinder_core");

  if (!activeTheme) {
    return <p>Please wrap Pathfinder with the Trailblazer component.</p>;
  }

  return (
    <div
      className={pathfinderWrapClass({
        withSchemaProps,
      })}
      data-testid="pathfinder-container"
    >
      {!withSchemaProps && <ConnectionBar />}
      <div className={pathfinderClass} data-testid="pathfinder-container">
        <div
          className={`${pathfinderPluginNavigationWrapClass} ${shared.hairlineBorder(
            {
              border: "right",
              onSurface: 1,
            },
          )}`}
        >
          <div className={pathfinderPluginNavigationClass}>
            <button
              className={schemaAwarePluginButtonClass({
                isActive: visibleSchemaAwarePlugin === "pathfinder_core",
              })}
              onClick={() => setVisibleSchemaAwarePlugin("pathfinder_core")}
            >
              <Icon name={"Compass"} size={"large"} />
            </button>
            <button
              className={schemaAwarePluginButtonClass({
                isActive: visibleSchemaAwarePlugin === "schema_documentation",
              })}
              onClick={() =>
                setVisibleSchemaAwarePlugin("schema_documentation")
              }
            >
              <Icon name={"Docs"} size={"large"} />
            </button>
            {schemaAwarePlugins.map((plugin) => {
              const Component = plugin.buttonContent;
              return (
                <button
                  key={plugin.name}
                  className={schemaAwarePluginButtonClass({
                    isActive: visibleSchemaAwarePlugin === plugin.name,
                  })}
                  onClick={() => setVisibleSchemaAwarePlugin(plugin.name)}
                >
                  <Component />
                </button>
              );
            })}
          </div>
        </div>
        <div className={schemaAwarePluginsWrapClass}>
          <div
            className={schemaAwarePluginClass({
              isVisible: visibleSchemaAwarePlugin === "pathfinder_core",
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
            className={schemaAwarePluginClass({
              isVisible: visibleSchemaAwarePlugin === "schema_documentation",
            })}
          >
            <SchemaDocumentation />
          </div>

          {schemaAwarePlugins.map((schemaAwarePlugin) => {
            const Component = schemaAwarePlugin.pluginContent;
            return (
              <div
                className={schemaAwarePluginClass({
                  isVisible:
                    visibleSchemaAwarePlugin === schemaAwarePlugin.name,
                })}
                key={schemaAwarePlugin.name}
              >
                <Component />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
