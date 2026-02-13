'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

interface Bookmark {
  id: string
  title: string
  url: string
}

export default function BookmarkList() {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([])

  const fetchBookmarks = async () => {
    const { data } = await supabase
      .from('bookmarks')
      .select('*')
      .order('created_at', { ascending: false })
    if (data) setBookmarks(data)
  }

  useEffect(() => {
    fetchBookmarks()

    const channel = supabase
      .channel('realtime-bookmarks')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'bookmarks' },
        () => fetchBookmarks()
      )
      .subscribe()

    return () => supabase.removeChannel(channel)
  }, [])

  const deleteBookmark = async (id: string) => {
    if (confirm('Delete this bookmark?')) {
      await supabase.from('bookmarks').delete().eq('id', id)
    }
  }

  if (bookmarks.length === 0) return <p className="mt-4">No bookmarks yet.</p>

  return (
    <div className="space-y-2 mt-4">
      {bookmarks.map((bookmark) => (
        <div key={bookmark.id} className="flex justify-between items-center bg-white p-3 rounded shadow">
          <a href={bookmark.url} target="_blank" className="text-blue-600 underline">
            {bookmark.title}
          </a>
          <button onClick={() => deleteBookmark(bookmark.id)} className="text-red-500">
            Delete
          </button>
        </div>
      ))}
    </div>
  )
}
