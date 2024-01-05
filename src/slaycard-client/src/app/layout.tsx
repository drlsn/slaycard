import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Image from 'next/image'

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
        <Image
            className='fixed w-full h-full opacity-100'
            src="/bgs/bg-1.jpg"
            alt="Dope"
            layout="fill"
            objectFit="cover"
          />
          {children}
      </body>
    </html>
  )
}
