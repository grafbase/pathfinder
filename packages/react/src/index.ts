import { setMonacoImporter } from '@pathfinder-ide/stores';

// store functions
export {
  setTheme as setPathfinderTheme,
  useThemeStore as usePathfinderThemeStore,
  setMonacoImporter,
} from '@pathfinder-ide/stores';

export { Pathfinder } from './pathfinder';

export { useSchemaDocumentationStore } from './schema-documentation/index';

// schema-dependent components
export { SchemaDocumentation } from './schema-documentation';
export { SchemaView } from './schema-view';

if (import.meta.__IS_LITE_MODE_ !== 'true') {
  setMonacoImporter(() => import('monaco-graphql/esm/monaco-editor'));
}
