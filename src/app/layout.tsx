import './globals.css'

export const metadata = {
  title: 'Smart Bookmark App',
  description: 'Simple bookmark manager',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-100">
        {children}
      </body>
    </html>
  )
}
