import { cache } from 'react'

/**
 * React cache wrapper for server-side data fetching
 * Deduplicates requests during a single render pass
 */

// Cache wrapper for any async function
export const createCachedFunction = (fn) => cache(fn)

// Export cache directly for inline usage
export { cache }
