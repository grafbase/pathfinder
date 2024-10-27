import { GraphQLDirective, GraphQLField, GraphQLNamedType } from 'graphql';
import { Icon } from '../../components';
import { paneItemStyles } from '../shared.styles.css';
import { useSchemaDocumentationStore } from '../store';
import { Markdown } from './markdown';

export const PaneItem = ({
  item,
  resetTertiaryPaneOnClick,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  item: GraphQLNamedType | GraphQLDirective | GraphQLField<any, any, any>;
  resetTertiaryPaneOnClick: boolean;
}) => {
  const { setActiveTertiaryPane } = useSchemaDocumentationStore.getState();

  return (
    <button
      className={paneItemStyles.container({
        color: 'NEUTRAL',
      })}
      onClick={() =>
        setActiveTertiaryPane({
          destinationPane: item,
          reset: resetTertiaryPaneOnClick,
        })
      }
    >
      <div className={paneItemStyles.layout}>
        <div>
          {'args' in item && !('isRepeatable' in item)
            ? `${item.name}(${item.args.length}): ${item.type.toString()}`
            : item.name}
        </div>
        <div className={paneItemStyles.description}>
          {item.description && <Markdown content={item.description} />}
        </div>
      </div>
      <div className={paneItemStyles.icon}>
        <Icon name="Chevron" />
      </div>
    </button>
  );
};
