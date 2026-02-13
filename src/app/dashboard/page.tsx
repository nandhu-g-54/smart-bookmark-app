'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import BookmarkForm from '@/components/BookmarkForm'
import BookmarkList from '@/components/BookmarkList'

export default function Dashboard() {
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        router.push('/')
      } else {
        setLoading(false)
      }
    }

    checkUser()
  }, [])

  const logout = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  if (loading) return <p className="flex items-center justify-center h-screen">Loading...</p>

  return (
    <main className="max-w-xl mx-auto mt-10 p-4">
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">My Bookmarks</h1>
        <button onClick={logout} className="text-sm text-gray-600">
          Logout
        </button>
      </div>

      <BookmarkForm />
      <BookmarkList />
    </main>
  )
}
