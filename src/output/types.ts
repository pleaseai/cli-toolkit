/**
 * Output format type for CLI commands
 */
export type OutputFormat = 'json' | 'toon'

/**
 * Output options interface
 */
export interface OutputOptions {
  /**
   * JSON output flag or field selection string
   */
  json?: string | boolean
  /**
   * Output format (json or toon)
   */
  format?: OutputFormat
}
