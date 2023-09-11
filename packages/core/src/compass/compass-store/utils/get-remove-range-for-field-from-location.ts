import { Location } from "graphql";

import type { MonacoIRange } from "@pathfinder/stores";

export const getRemoveRangeForFieldFromLocation = ({
  location,
  mode,
}: {
  location: Location;
  mode:
    | "ALL_SELECTIONS_ON_FIELD"
    | "SINGLE_CHILD_FIELD"
    | "FIELD_WITH_SELECTIONS";
}): MonacoIRange => {
  let range: MonacoIRange = {
    startLineNumber: 0,
    startColumn: 0,
    endLineNumber: 0,
    endColumn: 0,
  };

  if (mode === "ALL_SELECTIONS_ON_FIELD") {
    range = {
      startLineNumber: location.startToken.prev?.line as number,
      startColumn: (location.startToken.prev?.column as number) - 1,
      endLineNumber: location.endToken.next?.line as number,
      endColumn: (location.endToken.next?.column as number) + 1,
    };
  }

  if (mode === "SINGLE_CHILD_FIELD") {
    range = {
      startLineNumber: location.endToken.line,
      startColumn: 0,
      endLineNumber: location.endToken.line + 1,
      endColumn: 0,
    };
  }

  if (mode === "FIELD_WITH_SELECTIONS") {
    range = {
      startLineNumber: location.startToken.line,
      startColumn: 0,
      endLineNumber: location.endToken.line + 1,
      endColumn: 0,
    };
  }

  return range;
};
