// This file is a manual type declaration for the 'lodash-move' library.
// It tells TypeScript the shape of the 'move' function,
// resolving the TS7016 error when @types/lodash-move cannot be installed.

declare module 'lodash-move' {
  function move<T>(array: T[], from: number, to: number): T[];
  export = move;
}
