import { expect } from "vitest";
import matchers from "@testing-library/jest-dom/matchers";
import "fake-indexeddb/auto";

// import "@vanilla-extract/css/disableRuntimeStyles";

// mocks
import "./mocks/canvas";
import "./mocks/get-selection";
import "./mocks/match-media";
import "./mocks/query-command-supported";
import "./mocks/resize-observer";

expect.extend(matchers);
