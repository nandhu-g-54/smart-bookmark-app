'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function BookmarkForm() {
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(false)

  const addBookmark = async () => {
    if (!title || !url) return alert('Fill all fields')
    setLoading(true)
    try {
      await supabase.from('bookmarks').insert([{ title, url }])
      setTitle('')
      setUrl('')
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex gap-2 mt-4">
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border p-2 rounded flex-1"
      />
      <input
        type="url"
        placeholder="URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className="border p-2 rounded flex-1"
      />
      <button
        onClick={addBookmark}
        disabled={loading}
        className={`px-4 py-2 bg-blue-600 text-white rounded ${loading ? 'opacity-50' : ''}`}
      >
        {loading ? 'Adding...' : 'Add'}
      </button>
    </div>
  )
}
