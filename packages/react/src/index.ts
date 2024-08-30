// store functions
export {
  setTheme as setPathfinderTheme,
  useThemeStore as usePathfinderThemeStore,
} from '@pathfinder-ide/stores';

export { Pathfinder } from './pathfinder';

export { useSchemaDocumentationStore } from './schema-documentation/index';

// schema-dependent components
export { SchemaDocumentation } from './schema-documentation';
export { SchemaView } from './schema-view';
