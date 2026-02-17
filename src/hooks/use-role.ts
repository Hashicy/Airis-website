import { useAuth } from '@/context/auth-context' 
import type { Role } from '@/types'

export function useRole() {
  const { profile, isLoading } = useAuth()

  const role = profile?.role ?? 'user'

  const checkRole = (requiredRole: Role) => {
    if (isLoading) return false
    if (!profile) return false
    
    const hierarchy: Record<Role, number> = {
      user: 0,
      member: 1,
      core_committee: 2,
      faculty: 3,
      super_admin: 4
    }

    return hierarchy[role] >= hierarchy[requiredRole]
  }

  const isSuperAdmin = role === 'super_admin'
  const isMember = checkRole('member')
  const isCore = checkRole('core_committee')

  return {
    role,
    isLoading,
    isSuperAdmin,
    isMember,
    isCore,
    checkRole
  }
}
