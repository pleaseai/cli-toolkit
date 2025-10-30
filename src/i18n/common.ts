import type { CommonMessages, Language } from './types.ts'

/**
 * Common messages in Korean
 */
const commonKo: CommonMessages = {
  loading: '⏳ 로딩 중...',
  success: '✅ 성공',
  error: '❌ 오류',
  warning: '⚠️ 경고',
  info: 'ℹ️ 정보',
  unknownError: '알 수 없는 오류',
  errorPrefix: '❌ 오류',
  processing: (item: string | number) => `⏳ ${item} 처리 중...`,
  completed: (item: string | number) => `✅ ${item} 완료!`,
  failed: (item: string | number, error: string) => `❌ ${item} 실패: ${error}`,
}

/**
 * Common messages in English
 */
const commonEn: CommonMessages = {
  loading: '⏳ Loading...',
  success: '✅ Success',
  error: '❌ Error',
  warning: '⚠️ Warning',
  info: 'ℹ️ Info',
  unknownError: 'Unknown error',
  errorPrefix: '❌ Error',
  processing: (item: string | number) => `⏳ Processing ${item}...`,
  completed: (item: string | number) => `✅ ${item} completed!`,
  failed: (item: string | number, error: string) => `❌ ${item} failed: ${error}`,
}

/**
 * Common messages by language
 */
export const commonMessages: Record<Language, CommonMessages> = {
  ko: commonKo,
  en: commonEn,
}

/**
 * Get common messages for a language
 *
 * @param lang - Language code
 * @returns Common messages
 *
 * @example
 * ```typescript
 * const msg = getCommonMessages('ko')
 * console.log(msg.loading) // '⏳ 로딩 중...'
 * console.log(msg.processing('issue #123')) // '⏳ issue #123 처리 중...'
 * ```
 */
export function getCommonMessages(lang: Language): CommonMessages {
  return commonMessages[lang]
}
