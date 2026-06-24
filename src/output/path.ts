import { homedir } from 'node:os'

/**
 * Collapse a leading home-directory prefix to `~` for stable, portable output.
 *
 * Avoids leaking absolute home paths (e.g. `/Users/alice/...`) into structured
 * output, keeping results deterministic across machines and users — useful when
 * an agent or snapshot test consumes the output.
 *
 * Only an exact leading match of the home directory is collapsed; paths outside
 * the home directory are returned unchanged.
 *
 * @param path - Absolute path to normalize
 * @param homeDir - Home directory to collapse (default: `os.homedir()`)
 * @returns Path with the home prefix replaced by `~`, or the original path
 *
 * @example
 * ```typescript
 * collapseHomeDirectory('/Users/alice/project/bin', '/Users/alice')
 * // '~/project/bin'
 *
 * collapseHomeDirectory('/usr/local/bin', '/Users/alice')
 * // '/usr/local/bin' (unchanged)
 * ```
 */
export function collapseHomeDirectory(path: string, homeDir = homedir()): string {
  if (!homeDir || !path.startsWith(homeDir)) {
    return path
  }
  // Require a real path boundary after the prefix so a sibling directory that
  // merely shares the home basename (e.g. `/Users/alicebob` vs `/Users/alice`)
  // is not collapsed.
  const rest = path.slice(homeDir.length)
  if (rest === '' || rest.startsWith('/')) {
    return `~${rest}`
  }
  return path
}
