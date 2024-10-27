import {
  GraphQLDirective,
  GraphQLField,
  GraphQLNamedType,
  isInterfaceType,
  isObjectType,
  isUnionType,
} from 'graphql';
import { Icon } from '../../components';
import { paneItemStyles } from '../shared.styles.css';
import { useSchemaDocumentationStore } from '../store';
import { unwrapType } from '@pathfinder-ide/shared';

export const PaneItem = ({
  index,
  item,
  resetTertiaryPaneOnClick,
}: {
  index: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  item: GraphQLNamedType | GraphQLDirective | GraphQLField<any, any, any>;
  resetTertiaryPaneOnClick: boolean;
}) => {
  const { navigatePanes, setActiveTertiaryPane } = useSchemaDocumentationStore.getState();

  const panes = useSchemaDocumentationStore.use.panes();

  const title =
    'args' in item && !('isRepeatable' in item)
      ? `${item.name}${item.args.length > 0 && `(${item.args.length})`}: ${item.type.toString()}`
      : item.name;

  return (
    <button
      className={paneItemStyles.container({
        color: 'NEUTRAL',
        isActive: panes[index + 1] ? title === panes[index + 1].id : false,
      })}
      onClick={() => {
        // if a field that returns an object, union, or object
        if ('args' in item && !('isRepeatable' in item)) {
          //this is a field
          const unwrappedType = unwrapType(item.type);
          if (isObjectType(unwrappedType) || isInterfaceType(unwrappedType)) {
            const fields = unwrappedType.getFields();
            setActiveTertiaryPane({
              destinationPane: item,
              reset: resetTertiaryPaneOnClick,
            });
            navigatePanes({
              index,
              pane: {
                id: title,
                name: unwrappedType.name,
                pane: Object.keys(fields).map((field) => fields[field]),
              },
            });
          } else {
            return setActiveTertiaryPane({
              destinationPane: item,
              reset: resetTertiaryPaneOnClick,
            });
          }
        } else if (isUnionType(item) || isObjectType(item)) {
          if (isUnionType(item)) {
            // it's a union, let's show a new pane with the types
            const types = item.getTypes();
            return navigatePanes({
              index,
              pane: {
                id: title,
                name: item.name,
                pane: types.map((_type, i) => types[i]),
              },
            });
          } else {
            // it's an object, let's show a new pane with it's fields
            const fields = item.getFields();
            return navigatePanes({
              index,
              pane: {
                id: title,
                name: item.name,
                pane: Object.keys(fields).map((field) => fields[field]),
              },
            });
          }
        } else {
          return setActiveTertiaryPane({
            destinationPane: item,
            reset: resetTertiaryPaneOnClick,
          });
        }
      }}
    >
      <div className={paneItemStyles.layout}>
        <div>{title}</div>
        {/* This description causes layout issues, temporarily commenting out */}
        {/* <div className={paneItemStyles.description}>
          {item.description && <Markdown content={item.description} />}
        </div> */}
      </div>
      <div className={paneItemStyles.icon}>
        <Icon name="Chevron" />
      </div>
    </button>
  );
};
