import { SchemaView } from "./schema-view";
import { testSchema } from "@pathfinder-ide/stores/src/schema-store/test-schema";

export const WithSchema = () => {
  return <SchemaView schema={testSchema} />;
};
