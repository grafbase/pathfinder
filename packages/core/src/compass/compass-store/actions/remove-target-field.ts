import { type FieldNode, type InlineFragmentNode, Location } from "graphql";

import {
  MonacoIRange,
  getMonacoEditor,
  pushMonacoEditorEdit,
  useGraphQLDocumentStore,
} from "@pathfinder/stores";
import { DOCUMENT_EDITOR_ID } from "@pathfinder/shared";

import type {
  AncestorField,
  AncestorTypes,
  AncestorsArray,
} from "../compass-store.types";

import {
  getLocationFromAncestor,
  getRemoveRangeForFieldFromLocation,
  hasSiblingSelections as hasSiblingSelectionsFunc,
} from "../utils";

export const removeTargetField = ({
  ancestors,
  previousAncestor,
  target,
}: {
  ancestors: AncestorsArray;
  previousAncestor: AncestorTypes;
  target: AncestorField;
}) => {
  const documentEntries =
    useGraphQLDocumentStore.getState().documentEntries.length;

  const documentEditor = getMonacoEditor({ editorId: DOCUMENT_EDITOR_ID });

  const position = documentEditor?.getPosition() || {
    column: 1,
    lineNumber: 1,
  };

  const location = target.selection?.loc as Location;

  const hasSiblingSelections = hasSiblingSelectionsFunc({
    mode: "REMOVE",
    previousAncestor,
  });

  const locationFromPreviousAncestor = getLocationFromAncestor({
    ancestor: previousAncestor,
  });

  const isTopLevelField = previousAncestor.type === "ROOT";

  const isNestedField =
    previousAncestor.type === "FIELD" ||
    previousAncestor.type === "INLINE_FRAGMENT";

  // begin isTopLevelField
  if (isTopLevelField) {
    if (!hasSiblingSelections) {
      if (documentEntries < 2) {
        // console.log(
        //   'REMOVE: isTopLevelField && !hasSiblingSelections && documentEntries < 2'
        // )
        // start
        // query isTest {
        //   isTest
        // }

        // end
        // empty!

        const range = documentEditor
          ?.getModel()
          ?.getFullModelRange() as MonacoIRange;

        return pushMonacoEditorEdit({
          edits: [
            {
              range,
              text: null,
            },
          ],
          position,
          targetEditorId: DOCUMENT_EDITOR_ID,
        });
      }

      if (documentEntries >= 2) {
        // console.log(
        //   'REMOVE: isTopLevelField && !hasSiblingSelections && documentEntries >= 2'
        // )
        const range = getRemoveRangeForFieldFromLocation({
          location: locationFromPreviousAncestor as Location,
          mode: "FIELD_WITH_SELECTIONS",
        });

        // start
        // query IsTest {
        //   isTest <-- toggling here
        // }
        //
        // query Person {
        //   person
        // }

        // end
        // query Person {
        //   person
        // }

        return pushMonacoEditorEdit({
          edits: [
            {
              range,
              text: null,
            },
          ],
          position,
          targetEditorId: DOCUMENT_EDITOR_ID,
        });
      }
    }

    if (hasSiblingSelections) {
      const targetHasSelections =
        target.selection &&
        "selectionSet" in target.selection &&
        target.selection.selectionSet;

      if (targetHasSelections) {
        // console.log(
        //   'REMOVE: isTopLevelField && hasSiblingSelections && targetHasSelections'
        // )
        // start
        // query IsTest {
        //   isTest
        //   person { <-- toggling here
        //     name
        //   }
        // }

        // end
        // query IsTest {
        //   isTest
        // }

        // if this field has existing selections, we use an expanded range
        const range = getRemoveRangeForFieldFromLocation({
          location,
          mode: "FIELD_WITH_SELECTIONS",
        });

        return pushMonacoEditorEdit({
          edits: [
            {
              range,
              text: null,
            },
          ],
          position,
          targetEditorId: DOCUMENT_EDITOR_ID,
        });
      }
      if (!targetHasSelections) {
        // console.log(
        //   'REMOVE: isTopLevelField && hasSiblingSelections && !targetHasSelections'
        // )
        // start
        // query IsTest {
        //   isTest
        //   person <-- toggling here
        // }

        // end
        // query IsTest {
        //   isTest
        // }

        // if this field does not have selections, we just remove the field
        const range = getRemoveRangeForFieldFromLocation({
          location,
          mode: "SINGLE_CHILD_FIELD",
        });

        return pushMonacoEditorEdit({
          edits: [
            {
              range,
              text: null,
            },
          ],
          position,
          targetEditorId: DOCUMENT_EDITOR_ID,
        });
      }
    }
  }

  if (isNestedField) {
    if (!hasSiblingSelections) {
      if (previousAncestor.type === "INLINE_FRAGMENT") {
        const isSoleSelectionOnParentInlineFragment =
          previousAncestor.selection &&
          (previousAncestor.selection as InlineFragmentNode).selectionSet
            .selections.length === 1;

        if (isSoleSelectionOnParentInlineFragment) {
          // the previous ancestor is an inline fragment and this field is the only selection
          // we need to determine if the previous ancestor's (an inline fragment) parent (a field) has additional inline fragment selections

          // find the index of the parent inline fragment
          const nearestSelectedInlineFragmentIndex = [...ancestors]
            // .reverse()
            .findIndex((a) => a.type === "INLINE_FRAGMENT");

          // the parent (a field) of this field's parent (an inline fragment)
          const inlineFragmentParentField = ancestors[
            nearestSelectedInlineFragmentIndex - 1
          ] as AncestorField;

          const parentInlineFragmentIsSoleSelectionOnParent =
            inlineFragmentParentField.selection &&
            "selectionSet" in inlineFragmentParentField.selection &&
            inlineFragmentParentField.selection.selectionSet &&
            inlineFragmentParentField.selection.selectionSet.selections
              .length === 1;

          if (parentInlineFragmentIsSoleSelectionOnParent) {
            // console.log(
            //   `REMOVE: isNestedField && !hasSiblingSelections && previousAncestor.type === 'INLINE_FRAGMENT' && isSoleSelectionOnParentInlineFragment && parentInlineFragmentIsSoleSelectionOnParent`
            // )
            // start
            // query IsTest {
            //   isTest
            //   union {
            //     ... on First {
            //       name <-- toggling here
            //     }
            //   }
            // }

            // end
            // query IsTest {
            //   isTest
            //   union
            // }

            // this field's parent (an inline fragment) is the only selection
            const range = getRemoveRangeForFieldFromLocation({
              location: locationFromPreviousAncestor as Location,
              mode: "ALL_SELECTIONS_ON_FIELD",
            });

            return pushMonacoEditorEdit({
              edits: [{ range, text: null }],
              position,
              targetEditorId: DOCUMENT_EDITOR_ID,
            });
          } else {
            // console.log(
            //   `REMOVE: isNestedField && !hasSiblingSelections && previousAncestor.type === 'INLINE_FRAGMENT' && isSoleSelectionOnParentInlineFragment && !parentInlineFragmentIsSoleSelectionOnParent`
            // )
            // start
            // query IsTest {
            //   isTest
            //   union {
            //     ... on First {
            //       name
            //       first {
            //         name
            //       }
            //     }
            //     ... on Second {
            //       name <-- toggling here
            //     }
            //   }
            // }

            // end
            // query IsTest {
            //   isTest
            //   union {
            //     ... on First {
            //       name
            //       first {
            //         name
            //       }
            //     }
            //   }
            // }

            // this field's parent (an inline fragment) is not the only selection remaining on the inlineFragmentParentField
            const range = getRemoveRangeForFieldFromLocation({
              location: locationFromPreviousAncestor as Location,
              mode: "FIELD_WITH_SELECTIONS",
            });

            return pushMonacoEditorEdit({
              edits: [{ range, text: null }],
              position,
              targetEditorId: DOCUMENT_EDITOR_ID,
            });
          }
        }
      } else {
        // console.log(
        //   `REMOVE: isNestedField && !hasSiblingSelections && !(previousAncestor.type === 'INLINE_FRAGMENT')`
        // )
        // start
        // query IsTest {
        //   isTest
        //   person {
        //     name <-- toggling here
        //   }
        // }

        // end
        // query IsTest {
        //   isTest
        //   person
        // }

        // this field is the only selection of it's parent and there are no inline fragments in it's ancestry
        const range = getRemoveRangeForFieldFromLocation({
          location,
          mode: "ALL_SELECTIONS_ON_FIELD",
        });

        return pushMonacoEditorEdit({
          edits: [{ range, text: null }],
          position,
          targetEditorId: DOCUMENT_EDITOR_ID,
        });
      }
    }

    if (hasSiblingSelections) {
      const targetHasSelections = (
        target.selection as FieldNode | InlineFragmentNode
      ).selectionSet;

      if (targetHasSelections) {
        // console.log(
        //   `REMOVE: isNestedField && hasSiblingSelections && targetHasSelections`
        // )
        // start
        // query IsTest {
        //   isTest
        //   person {
        //     name
        //     friends { <-- toggling here
        //       name
        //     }
        //   }
        // }

        // end
        // query IsTest {
        //   isTest
        //   person {
        //     name
        //   }
        // }

        // if this field has existing selections, we use an expanded range
        const range = getRemoveRangeForFieldFromLocation({
          location,
          mode: "FIELD_WITH_SELECTIONS",
        });

        return pushMonacoEditorEdit({
          edits: [{ range, text: null }],
          position,
          targetEditorId: DOCUMENT_EDITOR_ID,
        });
      }
      if (!targetHasSelections) {
        // console.log(
        //   `REMOVE: isNestedField && hasSiblingSelections && !targetHasSelections`
        // )
        // start
        // query IsTest {
        //   isTest
        //   person {
        //     name
        //     age <-- toggling here
        //   }
        // }

        // end
        // query IsTest {
        //   isTest
        //   person {
        //     name
        //   }
        // }

        // if this field does not have selections, we just remove the field
        const range = getRemoveRangeForFieldFromLocation({
          location,
          mode: "SINGLE_CHILD_FIELD",
        });

        return pushMonacoEditorEdit({
          edits: [{ range, text: null }],
          position,
          targetEditorId: DOCUMENT_EDITOR_ID,
        });
      }
    }
  }

  return console.error(`removeTargetField: unhandled field toggle.`);
};
