import { parse } from 'graphql';

import type { DefinitionNode, DocumentNode, Location } from 'graphql';

import { Range } from 'monaco-graphql/esm/monaco-editor';

export const getLocationAndRangeForDefinition = ({
  definition,
}: {
  definition: DefinitionNode;
}): { range: Range; startLine: number; endLine: number } => {
  const location = definition.loc as Location;
  const startLine = location.startToken.line;
  const endLine = location.endToken.line;
  const range = new Range(
    startLine,
    location.startToken.column,
    endLine,
    location.endToken.column + 1,
  );
  return { range, startLine, endLine };
};

export const parseDocument = ({
  documentString,
}: {
  documentString: string;
}): DocumentNode | null | Error => {
  try {
    if (!documentString.trim()) {
      return null;
    }

    return parse(documentString);
  } catch (err) {
    return err as Error;
  }
};
