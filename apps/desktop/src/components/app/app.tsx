import { PluginSchemaAwareSchemaView, Trailblazer } from "@pathfinder/core";
import { appContainer } from "./app.css";

export const App = () => {
  return (
    <div className={appContainer}>
      <Trailblazer 
            plugins={{
              schemaAwarePlugins: [PluginSchemaAwareSchemaView],
            }}
      />
    </div>
  );
};
