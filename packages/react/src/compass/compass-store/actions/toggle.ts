import { Kind } from 'graphql';

import { graphQLDocumentStore } from '@pathfinder-ide/stores';

import type { AncestorField, AncestorRoot, AncestorsArray } from '../compass-store.types';

import { getPreviousAncestor, insertNewOperation } from '../utils';

import { addTargetArgument } from './add-target-argument';
import { addTargetField } from './add-target-field';
import { removeTargetArgument } from './remove-target-argument';
import { removeTargetField } from './remove-target-field';

export const toggle = ({
  ancestors,
}: {
  ancestors: AncestorsArray;
  // eslint-disable-next-line consistent-return
}) => {
  const activeDocumentEntry = graphQLDocumentStore.getState().activeDocumentEntry;

  const rootAncestor = ancestors[0] as AncestorRoot;

  // if the toggled item is on an operationType that differs from the current operationType, just insert a new operation
  if (
    activeDocumentEntry?.node.kind === Kind.OPERATION_DEFINITION &&
    activeDocumentEntry.node.operation !== rootAncestor.operationType
  ) {
    return insertNewOperation({
      ancestors,
      range: 'END',
    });
  }

  const target = ancestors[ancestors.length - 1];

  const previousAncestor = getPreviousAncestor({ ancestors, target });

  const isField = target.type === 'FIELD';

  const isArgument = target.type === 'ARGUMENT';

  if (isArgument) {
    const isSelected = !!target.selection;

    if (isSelected) {
      removeTargetArgument({
        target,
      });
    }

    if (!isSelected) {
      addTargetArgument({
        previousAncestor: previousAncestor as AncestorField,
        target,
      });
    }
  } // isArgument

  if (isField) {
    const isSelected = !!target.selection;

    if (isSelected) {
      removeTargetField({
        ancestors,
        previousAncestor,
        target,
      });
    }

    if (!isSelected) {
      addTargetField({ ancestors, previousAncestor, rootAncestor, target });
    }
  } // isField
};
