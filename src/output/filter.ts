import { pick } from 'es-toolkit'

/**
 * Parse comma-separated field list from --json argument
 *
 * @param fieldString - Field list string (e.g., "number,title,state") or boolean true
 * @returns Array of field names, or null for all fields
 *
 * @example
 * ```typescript
 * parseFields('number,title,state')  // ['number', 'title', 'state']
 * parseFields('  number , title  ')  // ['number', 'title'] (trimmed)
 * parseFields(true)                  // null (all fields)
 * parseFields(undefined)             // null (all fields)
 * ```
 */
export function parseFields(fieldString?: string | boolean): string[] | null {
  if (typeof fieldString !== 'string')
    return null
  return fieldString.split(',').map(f => f.trim()).filter(Boolean)
}

/**
 * Filter object or array to include only specified fields
 *
 * Uses es-toolkit's pick function for optimal performance (3.43x faster than lodash).
 *
 * @param data - Object or array to filter
 * @param fields - Field names to include (null = all fields)
 * @returns Filtered data with only specified fields
 *
 * @example
 * ```typescript
 * const data = [{ a: 1, b: 2, c: 3 }]
 * filterFields(data, ['a', 'c'])  // [{ a: 1, c: 3 }]
 * filterFields(data, null)        // [{ a: 1, b: 2, c: 3 }] (all fields)
 *
 * const obj = { a: 1, b: 2 }
 * filterFields(obj, ['a'])  // { a: 1 }
 * ```
 */
export function filterFields<T extends Record<string, any>>(
  data: T | T[],
  fields: string[] | null,
): Pick<T, keyof T> | Pick<T, keyof T>[] {
  if (!fields) {
    return data
  }

  const filterObject = (obj: T) => pick(obj, fields as (keyof T)[])

  return Array.isArray(data) ? data.map(filterObject) : filterObject(data)
}
