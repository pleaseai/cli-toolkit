import type { Language } from './types.ts'

/**
 * Detect system language from environment variables
 *
 * Checks LANG, LANGUAGE, and LC_ALL environment variables in order.
 * Returns 'ko' for Korean locales, 'en' for all others (default).
 *
 * @returns Detected language code
 *
 * @example
 * ```typescript
 * // LANG=ko_KR.UTF-8
 * detectSystemLanguage() // 'ko'
 *
 * // LANG=en_US.UTF-8
 * detectSystemLanguage() // 'en'
 *
 * // No locale set
 * detectSystemLanguage() // 'en' (default)
 * ```
 */
export function detectSystemLanguage(): Language {
  // eslint-disable-next-line node/prefer-global/process
  const lang = process.env.LANG || process.env.LANGUAGE || process.env.LC_ALL || ''
  return lang.startsWith('ko') ? 'ko' : 'en'
}
