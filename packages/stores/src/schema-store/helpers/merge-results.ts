import update from 'lodash.update';

import merge from 'lodash.merge';

import { type ExecutionResult } from 'graphql-sse';

export const mergeResults = (
  result: ExecutionResult<Record<string, unknown>, unknown>,
  lastResult?: ExecutionResult<Record<string, unknown>, unknown>,
) => {
  // bit of weird typing here, result should probably be returned as ExecutionResult | ExecutionPatchResult from graphql-sse
  // but that isn't the case
  if (!('path' in result) || lastResult === undefined) {
    return result;
  }

  const path = result.path as string[];

  const combined = update(lastResult, ['data', ...path], (value) =>
    merge(value, result.data),
  );

  const errors = [...(lastResult?.errors ?? []), ...(result.errors ?? [])];

  return { ...combined, ...(errors.length > 0 ? { errors } : undefined) };
};
