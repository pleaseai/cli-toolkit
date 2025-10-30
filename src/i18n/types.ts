/**
 * Supported language codes
 */
export type Language = 'ko' | 'en'

/**
 * Message dictionary interface
 *
 * Messages can be simple strings or functions that take parameters.
 * This allows for parameterized messages like "Processing issue #123"
 */
// eslint-disable-next-line ts/no-explicit-any
export type MessageDictionary = Record<string, string | ((...args: any[]) => string)>

/**
 * Common messages that all CLI tools can use
 */
export interface CommonMessages {
  loading: string
  success: string
  error: string
  warning: string
  info: string
  unknownError: string
  errorPrefix: string
  processing: (item: string | number) => string
  completed: (item: string | number) => string
  failed: (item: string | number, error: string) => string
}
