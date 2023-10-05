import type {
  MonacoEditorITextModel,
  MonacoIRange,
} from "@pathfinder-ide/stores";

import { getActiveDefinitionRange } from "./get-active-definition-range";

export const getRangeFromStringInActiveDefinition = ({
  model,
  string,
}: {
  model: MonacoEditorITextModel;
  string: string;
}): MonacoIRange | null => {
  const activeDefinitionRange = getActiveDefinitionRange();

  if (model && activeDefinitionRange) {
    const matches = model.findMatches(
      string,
      activeDefinitionRange,
      false,
      false,
      null,
      true,
    );

    // console.log('matches', { matches, string })

    if (matches.length === 1) {
      return matches[0].range;
    }
  }

  return null;
};
