import { useState } from "react";

import { usePluginsStore, useThemeStore } from "@pathfinder/stores";
import { shared } from "@pathfinder/style";

import { Compass } from "../compass";
import { Icon, Resizer } from "../components";
import { Scout } from "../scout";

import {
  pathfinderClass,
  pathfinderPluginNavigation,
  schemaAwarePluginButtonClass,
  schemaAwarePluginClass,
  schemaAwarePluginsWrapClass,
} from "./pathfinder.css";

export const Pathfinder = () => {
  const activeTheme = useThemeStore.use.activeTheme();

  const schemaAwarePlugins = usePluginsStore.getState().schemaAwarePlugins;

  const [visibleSchemaAwarePlugin, setVisibleSchemaAwarePlugin] = useState<
    string | null
  >("pathfinder_core");

  if (!activeTheme) {
    return <p>Please wrap Pathfinder with the Trailblazer component.</p>;
  }

  return (
    <div className={pathfinderClass} data-testid="pathfinder-container">
      <div
        className={`${pathfinderPluginNavigation} ${shared.hairlineBorder({
          border: "right",
          onSurface: 1,
        })}`}
      >
        <button
          className={schemaAwarePluginButtonClass({
            isActive: visibleSchemaAwarePlugin === "pathfinder_core",
          })}
          onClick={() => setVisibleSchemaAwarePlugin("pathfinder_core")}
        >
          <Icon name={"Compass"} size={"large"} />
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
        {schemaAwarePlugins.map((schemaAwarePlugin) => {
          const Component = schemaAwarePlugin.pluginContent;
          return (
            <div
              className={schemaAwarePluginClass({
                isVisible: visibleSchemaAwarePlugin === schemaAwarePlugin.name,
              })}
              key={schemaAwarePlugin.name}
            >
              <Component />
            </div>
          );
        })}
      </div>
    </div>
  );
};
