/**
 * Format a success message with emoji prefix
 *
 * @param message - Success message
 * @returns Formatted message with ✅ emoji
 *
 * @example
 * ```typescript
 * formatSuccess('Operation completed!')
 * // '✅ Operation completed!'
 * ```
 */
export function formatSuccess(message: string): string {
  return `✅ ${message}`
}

/**
 * Format an error message with emoji prefix
 *
 * @param message - Error message
 * @returns Formatted message with ❌ emoji
 *
 * @example
 * ```typescript
 * formatError('Operation failed')
 * // '❌ Operation failed'
 * ```
 */
export function formatError(message: string): string {
  return `❌ ${message}`
}

/**
 * Format an info message with emoji prefix
 *
 * @param message - Info message
 * @returns Formatted message with ℹ️ emoji
 *
 * @example
 * ```typescript
 * formatInfo('Processing...')
 * // 'ℹ️  Processing...'
 * ```
 */
export function formatInfo(message: string): string {
  return `ℹ️  ${message}`
}

/**
 * Format a warning message with emoji prefix
 *
 * @param message - Warning message
 * @returns Formatted message with ⚠️ emoji
 *
 * @example
 * ```typescript
 * formatWarning('Deprecated command')
 * // '⚠️  Deprecated command'
 * ```
 */
export function formatWarning(message: string): string {
  return `⚠️  ${message}`
}

/**
 * Format a progress/loading message with emoji prefix
 *
 * @param message - Progress message
 * @returns Formatted message with ⏳ emoji
 *
 * @example
 * ```typescript
 * formatProgress('Loading data...')
 * // '⏳ Loading data...'
 * ```
 */
export function formatProgress(message: string): string {
  return `⏳ ${message}`
}
