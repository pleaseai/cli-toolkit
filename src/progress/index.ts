/**
 * Progress and status reporting utilities
 *
 * Provides functions for displaying user-friendly progress indicators
 * and status messages during long-running CLI operations.
 *
 * @module progress
 */

// Progress indicator
export { createProgressIndicator } from './console.ts'

// Message formatters
export {
  formatError,
  formatInfo,
  formatProgress,
  formatSuccess,
  formatWarning,
} from './formatters.ts'

// Types
export type { ProgressIndicator } from './indicator.ts'
