/**
 * Progress indicator interface for long-running operations
 *
 * Provides a consistent interface for displaying progress and status
 * updates to users during CLI operations.
 */
export interface ProgressIndicator {
  /**
   * Display a start message (typically with 📡 emoji)
   */
  start: (message: string) => void

  /**
   * Display an update message (typically with ⏳ emoji)
   */
  update: (message: string) => void

  /**
   * Display a success message (typically with ✅ emoji)
   */
  success: (message: string) => void

  /**
   * Display an error message (typically with ❌ emoji)
   */
  error: (message: string) => void

  /**
   * Display an info message (typically with ℹ️ emoji)
   */
  info: (message: string) => void
}
