'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function LoginButton() {
  const [loading, setLoading] = useState(false)

  const login = async () => {
    setLoading(true)

    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}/dashboard` },
    })

    if (error) {
      alert(error.message)
      setLoading(false)
    }
  }

  return (
    <button
      onClick={login}
      disabled={loading}
      className={`px-4 py-2 bg-black text-white rounded ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      {loading ? 'Signing in...' : 'Sign in with Google'}
    </button>
  )
}
