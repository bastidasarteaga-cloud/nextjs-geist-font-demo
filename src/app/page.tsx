'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'

export default function HomePage() {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading) {
      if (user) {
        router.push('/dashboard')
      } else {
        router.push('/login')
      }
    }
  }, [user, loading, router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto">
            <div className="text-white text-2xl font-bold">🚒</div>
          </div>
          <div className="space-y-2">
            <div className="w-8 h-8 border-4 border-red-200 border-t-red-600 rounded-full animate-spin mx-auto"></div>
            <p className="text-gray-600">Cargando...</p>
          </div>
        </div>
      </div>
    )
  }

  return null
}
