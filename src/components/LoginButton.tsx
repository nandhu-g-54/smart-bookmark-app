'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function LoginButton() {
  const [loading, setLoading] = useState(false)

  const login = async () => {
    setLoading(true)
    try {
      await supabase.auth.signInWithOAuth({
        provider: 'google',
      })
    } catch (error) {
      console.error('Login error:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      onClick={login}
      className={`px-4 py-2 bg-black text-white rounded ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
      disabled={loading}
    >
      {loading ? 'Signing in...' : 'Sign in with Google'}
    </button>
  )
}
