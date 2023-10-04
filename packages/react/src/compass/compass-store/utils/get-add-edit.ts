import { type Location, TokenKind } from "graphql";

import type { MonacoIRange } from "@pathfinder/stores";

import { findNextTokenKindInLocation } from "./find-next-token-kind-in-location";

export const getAddEdit = ({
  incomingText,
  mode,
  siblingCount,
  targetLocation,
}: {
  incomingText: string;
  mode: "ARGUMENT" | "VARIABLE_DEFINITION";
  siblingCount: number;
  targetLocation: Location;
}): { range: MonacoIRange; text: string } => {
  let text = incomingText;
  let range: MonacoIRange = {
    startLineNumber: 0,
    endLineNumber: 0,
    startColumn: 0,
    endColumn: 0,
  };

  if (siblingCount > 0) {
    // with siblings
    const closeVariableParenthesis = findNextTokenKindInLocation({
      startToken: targetLocation.startToken,
      tokenKind: TokenKind.PAREN_R,
    });

    if (
      closeVariableParenthesis?.line !== closeVariableParenthesis?.prev?.line
    ) {
      text = `  ${text}\n`;
    } else {
      text = `, ${text}`;
    }

    range = {
      startLineNumber: closeVariableParenthesis?.line as number,
      endLineNumber: closeVariableParenthesis?.line as number,
      startColumn: closeVariableParenthesis?.column as number,
      endColumn: closeVariableParenthesis?.column as number,
    };
  } else {
    // without siblings
    text = `(${text})`;

    const line = targetLocation.startToken.line;
    let column = 0;
    let value = 0;

    if (mode === "ARGUMENT") {
      column = targetLocation.startToken.column;
      value = targetLocation.startToken.value.length;
    }

    if (mode === "VARIABLE_DEFINITION") {
      column = targetLocation.startToken.next?.column as number;
      value = targetLocation.startToken.next?.value.length as number;
    }

    range = {
      startLineNumber: line,
      endLineNumber: line,
      startColumn: column + value,
      endColumn: column + value,
    };
  }

  return { range, text };
};
