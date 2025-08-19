'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/hooks/useAuth'
import GermanEagleLogo from '@/components/GermanEagleLogo'

export default function PendingApprovalPage() {
  const { signOut, user } = useAuth()

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center">
            <GermanEagleLogo size={32} className="text-white" />
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900">
            Solicitud Pendiente
          </CardTitle>
          <CardDescription className="text-gray-600">
            Erste Frutillar - Sistema de Gestión
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="text-center space-y-4">
            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <h3 className="font-semibold text-yellow-800 mb-2">
                Tu solicitud está siendo revisada
              </h3>
              <p className="text-sm text-yellow-700">
                Hemos recibido tu solicitud de acceso al sistema. Un administrador 
                revisará tu solicitud y te asignará los permisos correspondientes.
              </p>
            </div>

            {user && (
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">
                  <strong>Email registrado:</strong><br />
                  {user.email}
                </p>
              </div>
            )}

            <div className="space-y-2 text-sm text-gray-600">
              <p>• El proceso de aprobación puede tomar 24-48 horas</p>
              <p>• Recibirás un email cuando tu cuenta sea activada</p>
              <p>• Solo personal autorizado puede acceder al sistema</p>
            </div>
          </div>

          <div className="space-y-3">
            <Button
              onClick={signOut}
              variant="outline"
              className="w-full text-gray-700 border-gray-300 hover:bg-gray-50"
            >
              Cerrar Sesión
            </Button>
            
            <div className="text-center">
              <p className="text-xs text-gray-500">
                ¿Problemas? Contacta al administrador del sistema
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
