import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

// Return a minimal noop supabase-like client when env vars are missing so
// Next.js static prerender doesn't fail in environments without secrets.
function createNoopClient() {
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
      // Make the chain awaitable: awaiting resolves to noopResult
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
    auth: { getSession: async () => ({ data: { session: null } }) },
  }
}

export async function createClient() {
  // If env vars are missing, return a noop client to avoid build-time errors
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return createNoopClient() as any
  }

  const cookieStore = await cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  )
}
