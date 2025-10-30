import type { Language, MessageDictionary } from './types.ts'

/**
 * I18n message registry and manager
 *
 * Manages message dictionaries for multiple domains and languages.
 * Allows each CLI tool to register its own message translations.
 *
 * @example
 * ```typescript
 * const i18n = new I18nManager()
 *
 * // Register messages for a domain
 * i18n.register('github.issues', 'en', {
 *   creating: 'Creating issue...',
 *   created: (number: number) => `Issue #${number} created!`
 * })
 *
 * i18n.register('github.issues', 'ko', {
 *   creating: '이슈 생성 중...',
 *   created: (number: number) => `이슈 #${number}가 생성되었습니다!`
 * })
 *
 * // Retrieve messages
 * const msg = i18n.get('github.issues', 'ko')
 * console.log(msg.creating) // '이슈 생성 중...'
 * console.log(msg.created(123)) // '이슈 #123가 생성되었습니다!'
 * ```
 */
export class I18nManager {
  private messages = new Map<string, Map<Language, MessageDictionary>>()

  /**
   * Register messages for a domain and language
   *
   * @param domain - Message domain (e.g., 'github.issues', 'asana.tasks')
   * @param lang - Language code
   * @param messages - Message dictionary
   */
  register<T extends MessageDictionary>(domain: string, lang: Language, messages: T): void {
    if (!this.messages.has(domain)) {
      this.messages.set(domain, new Map())
    }
    this.messages.get(domain)!.set(lang, messages as MessageDictionary)
  }

  /**
   * Get messages for a domain and language
   *
   * @param domain - Message domain
   * @param lang - Language code
   * @returns Message dictionary
   * @throws {Error} If domain or language not registered
   */
  get<T extends MessageDictionary>(domain: string, lang: Language): T {
    const domainMessages = this.messages.get(domain)
    if (!domainMessages) {
      throw new Error(`No messages registered for domain: ${domain}`)
    }

    const langMessages = domainMessages.get(lang)
    if (!langMessages) {
      throw new Error(`No ${lang} messages registered for domain: ${domain}`)
    }

    return langMessages as T
  }

  /**
   * Check if a domain has messages registered
   *
   * @param domain - Message domain
   * @returns True if domain is registered
   */
  has(domain: string): boolean {
    return this.messages.has(domain)
  }

  /**
   * Check if a domain has messages for a specific language
   *
   * @param domain - Message domain
   * @param lang - Language code
   * @returns True if domain and language are registered
   */
  hasLanguage(domain: string, lang: Language): boolean {
    return this.messages.get(domain)?.has(lang) ?? false
  }

  /**
   * Get all registered domains
   *
   * @returns Array of domain names
   */
  getDomains(): string[] {
    return Array.from(this.messages.keys())
  }

  /**
   * Get all registered languages for a domain
   *
   * @param domain - Message domain
   * @returns Array of language codes
   */
  getLanguages(domain: string): Language[] {
    const domainMessages = this.messages.get(domain)
    if (!domainMessages) {
      return []
    }
    return Array.from(domainMessages.keys())
  }
}

/**
 * Global I18n manager instance
 */
export const i18n = new I18nManager()
