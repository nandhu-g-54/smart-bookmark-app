# Smart Bookmark App

A simple **bookmark manager** built with **Next.js 13**, **TypeScript**, **Tailwind CSS**, and **Supabase** for authentication and database storage. Users can sign in with **Google OAuth**, add, view, and delete their personal bookmarks.

---

## Features

- Sign in with Google (OAuth) using Supabase Auth  
- Add, view, and delete bookmarks  
- Real-time updates using Supabase Realtime  
- Row-level security to ensure users only access their bookmarks  
- Responsive UI with Tailwind CSS  
- Client-side dashboard for authenticated users

---

## Folder Structure

```
smart-bookmark-app/
├── app/
│   ├── dashboard/
│   │   └── page.tsx
│   └── page.tsx
├── components/
│   ├── BookmarkForm.tsx
│   ├── BookmarkList.tsx
│   └── LoginButton.tsx
├── lib/
│   └── supabase.ts
├── public/
├── styles/
│   └── globals.css
├── .env.local
├── package.json
├── tsconfig.json
└── README.md
```

---

## Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/nandhu-g-54/smart-bookmark-app.git
cd smart-bookmark-app
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure Supabase

1. Create a project on [Supabase](https://supabase.com)  
2. Enable **Google OAuth** in Authentication → Providers  
3. Create a **table** `bookmarks` with this SQL:

```sql
create extension if not exists "uuid-ossp";

create table bookmarks (
  id uuid default uuid_generate_v4() primary key,
  title text,
  url text,
  user_id uuid references auth.users(id),
  created_at timestamp default now()
);

alter table bookmarks enable row level security;

create policy "Users can insert their own bookmarks"
on bookmarks for insert
with check (auth.uid() = user_id);

create policy "Users can view their own bookmarks"
on bookmarks for select
using (auth.uid() = user_id);

create policy "Users can delete their own bookmarks"
on bookmarks for delete
using (auth.uid() = user_id);
```

4. Get your **Supabase URL** and **anon key** from Project Settings → API

---

### 4. Add Environment Variables

Create a `.env.local` file in the root:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

> Replace with your actual Supabase project URL and anon key.

---

### 5. Run Locally

```bash
npm run dev
```

- Open your browser at [http://localhost:3000](http://localhost:3000)  
- Login with Google  
- Add and manage your bookmarks

---

### 6. Build for Production

```bash
npm run build
npm run start
```

---

### 7. Deploy to Vercel

1. Push your project to GitHub
2. Go to [Vercel](https://vercel.com) → Import Project  
3. Add environment variables in Vercel dashboard:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Deploy and open your live URL

---

## Components Overview

| Component          | Description                                         |
|-------------------|-----------------------------------------------------|
| `LoginButton.tsx`  | Google OAuth login button                           |
| `BookmarkForm.tsx` | Form to add new bookmarks                           |
| `BookmarkList.tsx` | List of bookmarks with delete functionality        |
| `Dashboard.tsx`    | Client-side dashboard showing user bookmarks       |
| `supabase.ts`      | Supabase client initialization                     |

---

## Notes

- Dashboard is a **client component** (`'use client'`) to ensure Supabase env variables work.  
- Supabase **row-level security** ensures users can only access their own bookmarks.  
- Google OAuth requires correct **redirect URI** in Supabase and Google Cloud Console.

---

## License

MIT License © Nandhu G
"# smart-bookmark-app" 
