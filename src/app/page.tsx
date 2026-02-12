'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import LoginButton from '@/components/LoginButton'
import { useRouter } from 'next/navigation'

export default function Home() {
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (user) {
        router.push('/dashboard')
      } else {
        setLoading(false)
      }
    }

    checkUser()
  }, [])

  if (loading) return <p className="flex items-center justify-center h-screen">Loading...</p>

  return (
    <main className="flex items-center justify-center h-screen">
      <LoginButton />
    </main>
  )
}
