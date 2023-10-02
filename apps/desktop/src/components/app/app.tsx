// relative path import here to src components
// this allows us to dev without the build step and forgo importing the built css file
import {
  PluginSchemaAwareSchemaView,
  Trailblazer,
} from "../../../../../packages/core/src";

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
