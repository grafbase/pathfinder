import 'fake-indexeddb/auto';
import '@testing-library/jest-dom/vitest';

import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';

// runs a cleanup after each test case (e.g. clearing jsdom)
afterEach(() => {
  cleanup();
});

// mocks
import './__mocks__/monaco-editor/canvas';
import './__mocks__/monaco-editor/get-selection';
import './__mocks__/monaco-editor/match-media';
import './__mocks__/monaco-editor/query-command-supported';
import './__mocks__/monaco-editor/resize-observer';
import './__mocks__/monaco-editor/worker';

vi.mock('zustand');
