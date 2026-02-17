import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

// Return a minimal noop supabase-like client when env vars are missing so
// Next.js static prerender doesn't fail in environments without secrets.
function createNoopClient() {
  const noopResult = { data: null, error: null }

  const chain = () => ({
    select: async () => noopResult,
    eq: () => chain(),
    in: () => chain(),
    order: () => chain(),
    limit: () => chain(),
    single: async () => noopResult,
    insert: async () => noopResult,
    update: async () => noopResult,
  })

  return {
    from: () => chain(),
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
