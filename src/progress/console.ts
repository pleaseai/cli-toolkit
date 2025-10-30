import type { ProgressIndicator } from './indicator.ts'

/**
 * Create a simple console-based progress indicator
 *
 * Uses emoji prefixes for visual feedback and outputs to stdout/stderr.
 *
 * @returns Console-based progress indicator
 *
 * @example
 * ```typescript
 * const progress = createProgressIndicator()
 * progress.start('Fetching data...')
 * progress.update('Processing records...')
 * progress.success('Operation completed!')
 * ```
 */
export function createProgressIndicator(): ProgressIndicator {
  return {
    start(message: string): void {
      console.log(`📡 ${message}`)
    },
    update(message: string): void {
      console.log(`⏳ ${message}`)
    },
    success(message: string): void {
      console.log(`✅ ${message}`)
    },
    error(message: string): void {
      console.error(`❌ ${message}`)
    },
    info(message: string): void {
      console.log(`ℹ️  ${message}`)
    },
  }
}
