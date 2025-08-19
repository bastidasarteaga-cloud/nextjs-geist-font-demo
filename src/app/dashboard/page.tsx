'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import AuthLayout from '@/components/AuthLayout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

// Mock data - will be replaced with real Supabase queries
interface DashboardStats {
  pendingCitations: number
  activeTasks: number
  upcomingShifts: number
  overduePayments: number
}

interface RecentActivity {
  id: string
  type: 'citation' | 'task' | 'shift' | 'payment'
  title: string
  date: string
  status: string
}

export default function DashboardPage() {
  const { userProfile } = useAuth()
  const [stats, setStats] = useState<DashboardStats>({
    pendingCitations: 0,
    activeTasks: 0,
    upcomingShifts: 0,
    overduePayments: 0
  })
  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading data - replace with real Supabase queries
    const loadDashboardData = async () => {
      try {
        // Mock data for now
        setStats({
          pendingCitations: 3,
          activeTasks: 5,
          upcomingShifts: 2,
          overduePayments: 1
        })

        setRecentActivity([
          {
            id: '1',
            type: 'citation',
            title: 'Citación para entrenamiento estructural',
            date: '2024-01-15',
            status: 'pending'
          },
          {
            id: '2',
            type: 'task',
            title: 'Mantenimiento de equipos',
            date: '2024-01-14',
            status: 'in_progress'
          },
          {
            id: '3',
            type: 'shift',
            title: 'Guardia nocturna - Escuadra 3',
            date: '2024-01-16',
            status: 'scheduled'
          }
        ])
      } catch (error) {
        console.error('Error loading dashboard data:', error)
      } finally {
        setLoading(false)
      }
    }

    loadDashboardData()
  }, [])

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'citation':
        return '📋'
      case 'task':
        return '✅'
      case 'shift':
        return '🕐'
      case 'payment':
        return '💰'
      default:
        return '📄'
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800">Pendiente</Badge>
      case 'in_progress':
        return <Badge className="bg-blue-100 text-blue-800">En Progreso</Badge>
      case 'scheduled':
        return <Badge className="bg-green-100 text-green-800">Programado</Badge>
      case 'completed':
        return <Badge className="bg-gray-100 text-gray-800">Completado</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  if (loading) {
    return (
      <AuthLayout>
        <div className="space-y-6">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-white p-6 rounded-lg border">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-8 bg-gray-200 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </AuthLayout>
    )
  }

  return (
    <AuthLayout>
      <div className="space-y-6">
        {/* Welcome Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-gray-900">
            Bienvenido, {userProfile?.full_name}
          </h1>
          <p className="text-gray-600">
            Resumen de tus actividades en la compañía
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Citaciones Pendientes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-gray-900">
                  {stats.pendingCitations}
                </span>
                <span className="text-2xl">📋</span>
              </div>
              <Link href="/citations">
                <Button variant="link" className="p-0 h-auto text-sm text-red-600">
                  Ver citaciones →
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Tareas Activas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-gray-900">
                  {stats.activeTasks}
                </span>
                <span className="text-2xl">✅</span>
              </div>
              <Link href="/tasks">
                <Button variant="link" className="p-0 h-auto text-sm text-red-600">
                  Ver tareas →
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Próximas Guardias
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-gray-900">
                  {stats.upcomingShifts}
                </span>
                <span className="text-2xl">🕐</span>
              </div>
              <Link href="/shifts">
                <Button variant="link" className="p-0 h-auto text-sm text-red-600">
                  Ver guardias →
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Cuotas Pendientes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-gray-900">
                  {stats.overduePayments}
                </span>
                <span className="text-2xl">💰</span>
              </div>
              <Link href="/dues">
                <Button variant="link" className="p-0 h-auto text-sm text-red-600">
                  Ver cuotas →
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Actividad Reciente</CardTitle>
            <CardDescription>
              Últimas actualizaciones en tus citaciones, tareas y guardias
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
                >
                  <div className="flex items-center space-x-4">
                    <span className="text-2xl">{getActivityIcon(activity.type)}</span>
                    <div>
                      <p className="font-medium text-gray-900">{activity.title}</p>
                      <p className="text-sm text-gray-600">{activity.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {getStatusBadge(activity.status)}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        {(userProfile?.role === 'admin' || userProfile?.role === 'officer') && (
          <Card>
            <CardHeader>
              <CardTitle>Acciones Rápidas</CardTitle>
              <CardDescription>
                Funciones disponibles para tu rol
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Link href="/citations/create">
                  <Button className="w-full bg-red-600 hover:bg-red-700">
                    Crear Citación
                  </Button>
                </Link>
                <Link href="/tasks/create">
                  <Button className="w-full" variant="outline">
                    Asignar Tarea
                  </Button>
                </Link>
                <Link href="/shifts/create">
                  <Button className="w-full" variant="outline">
                    Programar Guardia
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </AuthLayout>
  )
}
