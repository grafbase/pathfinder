import { SchemaDocumentation } from "./components/schema-documentation";
import { testSchema } from "@pathfinder-ide/stores/src/schema-store/test-schema";

export const WithSchema = () => {
  return <SchemaDocumentation schema={testSchema} />;
};
