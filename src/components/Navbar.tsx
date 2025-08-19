'use client'

import { useAuth } from '@/hooks/useAuth'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export default function Navbar() {
  const { userProfile, signOut } = useAuth()

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'bg-red-100 text-red-800'
      case 'officer':
        return 'bg-blue-100 text-blue-800'
      case 'treasurer':
        return 'bg-green-100 text-green-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getRoleDisplayName = (role: string) => {
    switch (role) {
      case 'admin':
        return 'Administrador'
      case 'officer':
        return 'Oficial'
      case 'treasurer':
        return 'Tesorero'
      case 'volunteer':
        return 'Voluntario'
      default:
        return role
    }
  }

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Left side - could add breadcrumbs or page title here */}
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-semibold text-gray-900">
            Sistema de Gestión - Erste Frutillar
          </h1>
        </div>

        {/* Right side - User info and actions */}
        <div className="flex items-center space-x-4">
          {userProfile && (
            <>
              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">
                    {userProfile.full_name}
                  </p>
                  <p className="text-xs text-gray-600">
                    {userProfile.email}
                  </p>
                </div>
                <Badge 
                  className={`${getRoleBadgeColor(userProfile.role)} border-0`}
                >
                  {getRoleDisplayName(userProfile.role)}
                </Badge>
              </div>

              {/* Notifications indicator - placeholder for future implementation */}
              <div className="relative">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-600 hover:text-gray-900"
                >
                  <span className="sr-only">Notificaciones</span>
                  <div className="w-5 h-5 border-2 border-current rounded-full"></div>
                  {/* Notification dot - show when there are notifications */}
                  {/* <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div> */}
                </Button>
              </div>

              <Button
                onClick={signOut}
                variant="outline"
                size="sm"
                className="text-gray-700 border-gray-300 hover:bg-gray-50"
              >
                Salir
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
