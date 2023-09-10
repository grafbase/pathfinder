import {
  type FieldNode,
  type FragmentSpreadNode,
  type InlineFragmentNode,
  Kind,
  type SelectionNode,
} from "graphql";

import { useGraphQLDocumentStore } from "@pathfinder/stores";

export const findSelection = ({
  fieldName,
  selections,
}: {
  fieldName: string;
  selections: SelectionNode[];
}): InlineFragmentNode | FieldNode | FragmentSpreadNode | undefined => {
  const selectionNode = selections?.find((selection) => {
    if (selection.kind === Kind.INLINE_FRAGMENT) {
      return selection.typeCondition?.name.value === fieldName;
    } else if (selection.kind === Kind.FRAGMENT_SPREAD) {
      // if we're here, it means there's a fragment spread being used in the activeDefinition
      // it also means that there's a fragment definition somewhere in the document
      // 👇 example

      // fragment USER_FRAG on User { <-- these 4 lines are the fragment definition
      //   name
      //   id
      // }

      // query USERS { <-- our cursor is somewhere in here, so this is the activeDefinition
      //   userCollection(first: 10) {
      //     edges {
      //       node {
      //         ...USER_FRAG <-- this is the fragment spread
      //       }
      //     }
      //   }
      // }

      // attempt to find the fragment definition for this fragment spread
      const fragmentEntry = useGraphQLDocumentStore
        .getState()
        .documentEntries.find(
          (d) =>
            d.node.kind === Kind.FRAGMENT_DEFINITION &&
            d.node.name.value === selection.name.value,
        );

      // attempt to find within the fragment definition our fieldName
      const possibleSelectionNode =
        fragmentEntry?.node?.kind === Kind.FRAGMENT_DEFINITION &&
        fragmentEntry.node.selectionSet.selections.find(
          (s) => (s as FieldNode).name.value === fieldName,
        );

      return possibleSelectionNode;
    }

    // otherwise, it's a FIELD
    return selection.name.value === fieldName;
  });

  if (selectionNode) {
    if (selectionNode.kind === Kind.INLINE_FRAGMENT) {
      return selectionNode as InlineFragmentNode;
    }
    if (selectionNode.kind === Kind.FRAGMENT_SPREAD) {
      return selectionNode as FragmentSpreadNode;
    }
    if (selectionNode.kind === Kind.FIELD) {
      return selectionNode as FieldNode;
    }
  }
  return undefined;
};
