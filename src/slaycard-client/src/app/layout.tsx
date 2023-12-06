import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'DB Gwent',
  description: 'The Gwent card game in Dragon Ball theme',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const htmlClass = `min-h-full h-full`
  const bodyClass = `${inter.className} min-h-full h-full`

  return (
    <html lang="en" className={htmlClass}>
      <body className={bodyClass}>
          {children}
      </body>
    </html>
  )
}
