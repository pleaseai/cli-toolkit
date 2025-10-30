/**
 * Internationalization (i18n) utilities for CLI tools
 *
 * Provides language detection, message management, and common translations
 * for building multilingual command-line interfaces.
 *
 * @module i18n
 */

// Common messages
export { commonMessages, getCommonMessages } from './common.ts'

// Language detection
export { detectSystemLanguage } from './detector.ts'

// Message management
export { i18n, I18nManager } from './manager.ts'

// Types
export type { CommonMessages, Language, MessageDictionary } from './types.ts'
