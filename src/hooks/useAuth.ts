'use client'

import { useEffect, useState } from 'react'
import { User } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabaseClient'
import { User as AppUser } from '@/lib/supabaseClient'

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [userProfile, setUserProfile] = useState<AppUser | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // For demo purposes, check localStorage for mock user
    const checkDemoUser = () => {
      const demoUser = localStorage.getItem('demo-user')
      if (demoUser) {
        const userData = JSON.parse(demoUser)
        setUserProfile(userData)
        setUser({
          id: userData.id,
          email: userData.email,
          user_metadata: { full_name: userData.full_name }
        } as any)
      }
      setLoading(false)
    }

    checkDemoUser()
  }, [])

  const fetchUserProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single()

      if (error) {
        console.error('Error fetching user profile:', error)
        return
      }

      setUserProfile(data)
    } catch (error) {
      console.error('Error fetching user profile:', error)
    }
  }

  const signInWithGoogle = async () => {
    try {
      // For demo purposes, simulate a successful login
      // In production, this would use real Supabase OAuth
      console.log('Demo login - simulating Google OAuth')
      
      // Create a mock user session for development
      const mockUser = {
        id: 'demo-user-123',
        email: 'demo@erstefrutillar.com',
        full_name: 'Usuario Demo',
        role: 'volunteer' as const,
        created_at: new Date().toISOString()
      }
      
      // Store mock user in localStorage for demo
      localStorage.setItem('demo-user', JSON.stringify(mockUser))
      setUserProfile(mockUser)
      
      // Simulate auth user
      const mockAuthUser = {
        id: 'demo-user-123',
        email: 'demo@erstefrutillar.com',
        user_metadata: { full_name: 'Usuario Demo' }
      } as any
      
      setUser(mockAuthUser)
      
      // Force redirect to dashboard
      window.location.href = '/dashboard'
      
    } catch (error) {
      console.error('Error signing in with Google:', error)
      throw error
    }
  }

  const signOut = async () => {
    try {
      // For demo purposes, clear localStorage
      localStorage.removeItem('demo-user')
      setUser(null)
      setUserProfile(null)
    } catch (error) {
      console.error('Error signing out:', error)
      throw error
    }
  }

  const hasRole = (role: string): boolean => {
    return userProfile?.role === role
  }

  const isAdmin = (): boolean => {
    return userProfile?.role === 'admin'
  }

  const isOfficer = (): boolean => {
    return userProfile?.role === 'officer' || userProfile?.role === 'admin'
  }

  const isTreasurer = (): boolean => {
    return userProfile?.role === 'treasurer' || userProfile?.role === 'admin'
  }

  return {
    user,
    userProfile,
    loading,
    signInWithGoogle,
    signOut,
    hasRole,
    isAdmin,
    isOfficer,
    isTreasurer
  }
}
