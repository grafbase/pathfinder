import { Location } from "graphql";

import { DOCUMENT_EDITOR_ID } from "@pathfinder-ide/shared";

import {
  type MonacoIPosition,
  type MonacoIRange,
  pushMonacoEditorEdit,
  useGraphQLDocumentStore,
} from "@pathfinder-ide/stores";

import { INDENT_SIZE } from "../constants";

import {
  AncestorArgument,
  AncestorField,
  AncestorInlineFragment,
  AncestorRoot,
  AncestorTypes,
  AncestorsArray,
} from "../compass-store.types";

import {
  generateText,
  getAddRangeForFieldFromLocation,
  getLocationFromAncestor,
  getPositionAtEndOfLocation,
  hasSiblingSelections as hasSiblingSelectionsFunc,
  insertNewOperation,
} from "../utils";

export const addTargetField = ({
  ancestors,
  previousAncestor,
  rootAncestor,
  target,
}: {
  ancestors: AncestorsArray;
  previousAncestor: Exclude<AncestorTypes, AncestorArgument>;
  rootAncestor: AncestorRoot;
  target: AncestorField;
}) => {
  const hasSiblingSelections = hasSiblingSelectionsFunc({
    mode: "ADD",
    previousAncestor,
  });

  const previousAncestorLocation = getLocationFromAncestor({
    ancestor: previousAncestor,
  }) as Location;

  const isTopLevelField = previousAncestor.type === "ROOT";

  const previousAncestorIsSelected =
    !isTopLevelField && previousAncestor.selection;

  const documentEntries =
    useGraphQLDocumentStore.getState().documentEntries.length;

  if (!hasSiblingSelections && documentEntries === 0) {
    // this is an early check for a deep-toggle, meaning a user has expanded one or more levels of a field and is toggling without any ancestors being selected
    // `documentEntries === 0` tells us that the document editor doesn't have any parseable operations
    // `!hasSiblingSelections` is critical here because it tells us that there isn't an in-progress operation definition somewhere in the document editor
    // if we didn't have the `!hasSiblingSelections` check, we'd wipe out any in-progress operation definition(s) in the document editor
    // no fancy monaco shenanigans to do here, just feed all the ancestors to insertNewOperation
    // console.log('!hasSiblingSelections && documentEntries === 0')

    return insertNewOperation({ ancestors, range: "END" });
  }

  // begin is top level field
  if (isTopLevelField) {
    if (!hasSiblingSelections) {
      // console.log('isTopLevelField && !hasSiblingSelections')

      // this condition can be true for two reasons; 1) the editor is empty 2) the cursor in the editor is not within a definition
      return insertNewOperation({
        ancestors,
        range: "END",
      });
    }

    if (hasSiblingSelections) {
      // console.log('ADD: isTopLevelField && hasSiblingSelections')
      // start
      // query isTestQuery {
      //   isTest <-- hasSiblingSelections is true because this sibling field is already selected
      // }

      // end
      // query newIsTestQuery {
      //   isTest
      //   person <-- toggled here
      // }

      const range = getAddRangeForFieldFromLocation({
        hasSelections: true,
        location: previousAncestorLocation,
      });

      const text = `${" ".repeat(
        previousAncestorLocation.startToken.column * INDENT_SIZE,
      )}${target.field.name}\n`;

      const position = getPositionAtEndOfLocation({
        location: previousAncestorLocation,
        newTextLength: text.length,
      });

      return pushMonacoEditorEdit({
        edits: [{ range, text }],
        position,
        targetEditorId: DOCUMENT_EDITOR_ID,
      });
    }
  }
  // end is top level field

  // begin is NOT top level field
  if (!isTopLevelField) {
    if (previousAncestorIsSelected) {
      if (!hasSiblingSelections) {
        // console.log(
        //   'ADD: !isTopLevelField && previousAncestorIsSelected && !hasSiblingSelections'
        // )
        // start
        // query newIsTestQuery {
        //   isTest
        //   person <--previousAncestorIsSelected with no selections
        // }

        // end
        // query newIsTestQuery {
        //   isTest
        //   person {
        //     name <--toggling here
        //   }
        // }

        const range = getAddRangeForFieldFromLocation({
          hasSelections: false,
          location: previousAncestorLocation,
        });

        const text = ` {\n${" ".repeat(
          previousAncestorLocation.startToken.column + 1,
        )}${target.field.name}\n${" ".repeat(
          previousAncestorLocation.startToken.column - 1,
        )}}`;

        const position = getPositionAtEndOfLocation({
          location: previousAncestorLocation,
          newTextLength: text.length,
        });

        return pushMonacoEditorEdit({
          edits: [{ range, text }],
          position,
          targetEditorId: DOCUMENT_EDITOR_ID,
        });
      }

      if (hasSiblingSelections) {
        // console.log(
        //   'ADD: !isTopLevelField && previousAncestorIsSelected && hasSiblingSelections'
        // )
        // start
        // query newIsTestQuery {
        //   isTest
        //   person { <-- previousAncestorIsSelected
        //     name <-- hasSiblingSelections
        //   }
        // }

        // end
        // query newIsTestQuery {
        //   isTest
        //   person {
        //     name
        //     age <--toggling here
        //   }
        // }
        const range = getAddRangeForFieldFromLocation({
          hasSelections: true,
          location: previousAncestorLocation,
        });

        const text = `${" ".repeat(
          previousAncestorLocation.startToken.column + 1,
        )}${target.field.name}\n`;

        const position = getPositionAtEndOfLocation({
          location: previousAncestorLocation,
          newTextLength: text.length,
        });

        return pushMonacoEditorEdit({
          edits: [{ range, text }],
          position,
          targetEditorId: DOCUMENT_EDITOR_ID,
        });
      }
    }

    // this is the most complicated case to reckon...reader beware ☠️
    // our target is a nested field and the previous ancestor is not selected
    if (!previousAncestorIsSelected) {
      // capture all ancestors except the first, which is always the root operation type
      const fieldAncestors = [...ancestors.slice(1)] as Array<
        AncestorField | AncestorInlineFragment
      >;

      // from those ancestors, capture all that are not selected
      // we'll use this array to build our new selection
      const allUnselectedAncestors = fieldAncestors.filter((a) => !a.selection);

      // capture the nearest ancestor that is selected
      // used for location/range and determining if our new selection should be wrapped in brackets
      const nearestSelectedAncestor = [...fieldAncestors]
        .reverse()
        .find((a) => a.selection);

      // a boolean indicating whether our nearest selected ancestor has selections of its own
      // also used for location/range and determining if our new selection should be wrapped in brackets
      const nearestSelectedAncestorHasSelections = !!(
        nearestSelectedAncestor?.selection &&
        // eslint-disable-next-line no-unsafe-optional-chaining
        "selectionSet" in nearestSelectedAncestor?.selection &&
        nearestSelectedAncestor?.selection.selectionSet
      );

      // the location of our insert action is either the nearest selected ancestor or the root operation type
      const location = nearestSelectedAncestor
        ? (nearestSelectedAncestor.selection?.loc as Location)
        : (rootAncestor.operationDefinition?.loc as Location);

      let position: MonacoIPosition = {
        column:
          allUnselectedAncestors.length * INDENT_SIZE +
          1 +
          target.field.name.length,
        lineNumber: location.endToken.line + allUnselectedAncestors.length - 1,
      };

      let range: MonacoIRange | null = null;

      if (!nearestSelectedAncestor) {
        // console.log(
        //   'ADD: !isTopLevelField && !previousAncestorIsSelected && !nearestSelectedAncestor'
        // )
        // start
        // query newIsTestQuery { <-- "person" is NOT in this selection set and we are toggling a child of "person"
        //   isTest
        // }

        // end
        // query newIsTestQuery {
        //   isTest
        //   person {
        //     name <--toggling here or _any_ child field of "person" when "person" has no selections
        //   }
        // }

        position = {
          lineNumber:
            location.endToken.line + allUnselectedAncestors.length - 1,
          column:
            allUnselectedAncestors.length * INDENT_SIZE +
            1 +
            target.field.name.length,
        };

        range = getAddRangeForFieldFromLocation({
          hasSelections: true,
          location,
        });

        return pushMonacoEditorEdit({
          edits: [
            {
              range,
              text: generateText({
                allUnselectedAncestors,
                ancestors,
                nearestSelectedAncestor,
                nearestSelectedAncestorHasSelections,
              }),
            },
          ],
          position,
          targetEditorId: DOCUMENT_EDITOR_ID,
        });
      }

      if (nearestSelectedAncestor) {
        if (nearestSelectedAncestorHasSelections) {
          // console.log(
          //   'ADD: !isTopLevelField && !previousAncestorIsSelected && nearestSelectedAncestor && nearestSelectedAncestorHasSelections'
          // )
          // start
          // query newIsTestQuery {
          //   isTest
          //   person { <-- nearestSelectedAncestor
          //     name <-- nearestSelectedAncestorHasSelections
          //   }
          // }

          // end
          // query newIsTestQuery {
          //   isTest
          //   person {
          //     name
          //     friends {
          //       name <-- toggling here
          //     }
          //   }
          // }

          position = {
            lineNumber:
              location.endToken.line + allUnselectedAncestors.length - 1,
            column:
              ancestors.length * INDENT_SIZE + target.field.name.length - 1,
          };
          range = getAddRangeForFieldFromLocation({
            hasSelections: true,
            location,
          });

          return pushMonacoEditorEdit({
            edits: [
              {
                range,
                text: generateText({
                  allUnselectedAncestors,
                  ancestors,
                  nearestSelectedAncestor,
                  nearestSelectedAncestorHasSelections,
                }),
              },
            ],
            position,
            targetEditorId: DOCUMENT_EDITOR_ID,
          });
        }
        if (!nearestSelectedAncestorHasSelections) {
          // console.log(
          //   'ADD: !isTopLevelField && !previousAncestorIsSelected && nearestSelectedAncestor && !nearestSelectedAncestorHasSelections'
          // )
          // start
          // query newIsTestQuery {
          //   isTest
          //   person <-- nearestSelectedAncestor has no selections
          // }

          // end
          // query newIsTestQuery {
          //   isTest
          //   person {
          //     friends {
          //       name <-- toggling here
          //     }
          //   }
          // }

          position = {
            lineNumber: location.endToken.line + allUnselectedAncestors.length,
            column:
              ancestors.length * INDENT_SIZE + target.field.name.length - 1,
          };
          range = getAddRangeForFieldFromLocation({
            hasSelections: false,
            location,
          });

          return pushMonacoEditorEdit({
            edits: [
              {
                range,
                text: generateText({
                  allUnselectedAncestors,
                  ancestors,
                  nearestSelectedAncestor,
                  nearestSelectedAncestorHasSelections,
                }),
              },
            ],
            position,
            targetEditorId: DOCUMENT_EDITOR_ID,
          });
        }
      }
    }
  }
  // end is NOT top level field

  return console.error(`addTargetField: unhandled field toggle.`);
};
