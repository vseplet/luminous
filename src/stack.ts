/**
 * Get last function name from stack trace
 * @param depth depth of stack trace
 * @returns current function name
 */
// https://stackoverflow.com/questions/280389/how-do-you-find-out-the-caller-function-in-javascript
export function getCallerFunctionName(depth: number = 3) {
  const stack = new Error().stack;
  const caller = stack?.split('\n')[depth];
  const callerFunctionName = caller?.split(' ')[1];
  return callerFunctionName;
}

/**
 * Get file name from stack trace and return it
 * @param depth depth of stack trace
 * @returns current file name
 */
export function getCallerFileName(depth: number = 3) {
  const stack = new Error().stack;
  const caller = stack?.split('\n')[depth];
  const callerFileName = caller?.split(' ')[0];
  return callerFileName;
}
