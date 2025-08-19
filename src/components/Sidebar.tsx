'use client'

import { useAuth } from '@/hooks/useAuth'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import GermanEagleLogo from '@/components/GermanEagleLogo'

const navigationItems = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    roles: ['admin', 'officer', 'treasurer', 'volunteer']
  },
  {
    name: 'Citaciones',
    href: '/citations',
    roles: ['admin', 'officer', 'treasurer', 'volunteer']
  },
  {
    name: 'Tareas',
    href: '/tasks',
    roles: ['admin', 'officer', 'treasurer', 'volunteer']
  },
  {
    name: 'Guardias',
    href: '/shifts',
    roles: ['admin', 'officer', 'treasurer', 'volunteer']
  },
  {
    name: 'Cuotas',
    href: '/dues',
    roles: ['admin', 'officer', 'treasurer', 'volunteer']
  },
  {
    name: 'Calendario',
    href: '/calendar',
    roles: ['admin', 'officer', 'treasurer', 'volunteer']
  }
]

const adminItems = [
  {
    name: 'Gestión de Oficiales',
    href: '/admin/officers',
    roles: ['admin']
  },
  {
    name: 'Configuración',
    href: '/admin/settings',
    roles: ['admin']
  }
]

export default function Sidebar() {
  const { userProfile, signOut } = useAuth()
  const pathname = usePathname()

  const hasAccess = (roles: string[]) => {
    return userProfile && roles.includes(userProfile.role)
  }

  const isActive = (href: string) => {
    return pathname === href
  }

  return (
    <div className="w-64 bg-white border-r border-gray-200 h-full flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center">
            <GermanEagleLogo size={24} className="text-white" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Erste Frutillar</h2>
            <p className="text-sm text-gray-600">Sistema de Gestión</p>
          </div>
        </div>
      </div>

      {/* User Info */}
      {userProfile && (
        <div className="p-4 border-b border-gray-200">
          <div className="space-y-1">
            <p className="text-sm font-medium text-gray-900">
              {userProfile.full_name}
            </p>
            <p className="text-xs text-gray-600 capitalize">
              {userProfile.role}
            </p>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        <div className="space-y-1">
          {navigationItems.map((item) => {
            if (!hasAccess(item.roles)) return null
            
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive(item.href)
                    ? 'bg-red-50 text-red-700 border-l-4 border-red-600'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                {item.name}
              </Link>
            )
          })}
        </div>

        {/* Admin Section */}
        {userProfile?.role === 'admin' && (
          <>
            <Separator className="my-4" />
            <div className="space-y-1">
              <p className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Administración
              </p>
              {adminItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive(item.href)
                      ? 'bg-red-50 text-red-700 border-l-4 border-red-600'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </>
        )}
      </nav>

      {/* Sign Out */}
      <div className="p-4 border-t border-gray-200">
        <Button
          onClick={signOut}
          variant="outline"
          className="w-full text-gray-700 border-gray-300 hover:bg-gray-50"
        >
          Cerrar Sesión
        </Button>
      </div>
    </div>
  )
}
