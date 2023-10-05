import { type Location } from "graphql";

import { DOCUMENT_EDITOR_ID } from "@pathfinder-ide/shared";

import { type MonacoIPosition, getMonacoEditor } from "@pathfinder-ide/stores";

export const getPositionAtEndOfLocation = ({
  location,
  newTextLength,
}: {
  location: Location;
  newTextLength: number;
}): MonacoIPosition => {
  const locationEndPosition = getMonacoEditor({ editorId: DOCUMENT_EDITOR_ID })
    ?.getModel()
    ?.getPositionAt(location.end) as MonacoIPosition;

  const position = {
    lineNumber: locationEndPosition.lineNumber,
    column: locationEndPosition.column + newTextLength,
  };
  return position;
};
