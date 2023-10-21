import {
  GraphQLObjectType,
  GraphQLUnionType,
  InlineFragmentNode,
  Kind,
  SelectionNode,
} from 'graphql';

import type { AncestorInlineFragment, AncestorsArray } from '../../compass-store';
import { Fields } from '../fields';
import { ListItem } from '../list-item';

type UnionProps = {
  ancestors: AncestorsArray;
  parentSelections: ReadonlyArray<SelectionNode>;
  unionType: GraphQLUnionType;
};

export const Union = ({ ancestors, parentSelections, unionType }: UnionProps) => {
  const unionMembers = unionType.getTypes();

  return (
    <>
      {unionMembers.map((o) => (
        <UnionMember
          key={o.name}
          ancestors={ancestors}
          objectMember={o}
          parentSelections={parentSelections}
        />
      ))}
    </>
  );
};

const UnionMember = ({
  ancestors,
  objectMember,
  parentSelections,
}: {
  ancestors: AncestorsArray;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  objectMember: GraphQLObjectType<any, any>;
  parentSelections: ReadonlyArray<SelectionNode>;
}) => {
  const inlineFragmentNode = parentSelections?.find(
    (s) =>
      s.kind === Kind.INLINE_FRAGMENT &&
      s.typeCondition?.name.value === objectMember.name,
  ) as InlineFragmentNode | undefined;

  const newAncestors = [
    ...ancestors,
    {
      type: 'INLINE_FRAGMENT',
      onType: objectMember.name,
      selection: inlineFragmentNode || null,
    } as AncestorInlineFragment,
  ];

  return (
    <ListItem
      ancestors={newAncestors}
      collapsibleContent={{
        childFields: (
          <Fields
            ancestors={newAncestors}
            fields={objectMember.getFields()}
            parentSelections={
              inlineFragmentNode ? inlineFragmentNode.selectionSet.selections : []
            }
          />
        ),
      }}
      isSelected={!!inlineFragmentNode}
      type={objectMember}
      variant="INLINE_FRAGMENT"
    />
  );
};
