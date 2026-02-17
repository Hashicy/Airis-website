import { createBrowserClient } from '@supabase/ssr'

// Return a minimal noop supabase-like client for server/static builds or when
// env vars are missing. This prevents browser-only APIs from running during
// Next.js static export or server-side bundling.
function createNoopBrowserClient() {
  const noopResult = { data: null, error: null }

  function makeChain() {
    const ch: any = {
      select: () => ch,
      eq: () => ch,
      in: () => ch,
      order: () => ch,
      limit: () => ch,
      single: () => ch,
      insert: () => ch,
      update: () => ch,
      then(onFulfilled: any, onRejected: any) {
        return Promise.resolve(noopResult).then(onFulfilled, onRejected)
      },
      catch(onRejected: any) {
        return Promise.resolve(noopResult).catch(onRejected)
      },
    }

    return ch
  }

  return {
    from: () => makeChain(),
    auth: {
      getSession: async () => ({ data: { session: null } }),
      signInWithOAuth: async () => ({ data: null }),
      signOut: async () => ({}),
      onAuthStateChange: (_cb: any) => ({ data: { subscription: { unsubscribe: () => {} } } }),
    },
  }
}

export const createClient = () => {
  // If not in a browser environment or env vars are missing, use a noop client
  if (typeof window === 'undefined' || !process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return createNoopBrowserClient() as any
  }

  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
