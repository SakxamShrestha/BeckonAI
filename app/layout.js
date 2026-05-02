import localFont from 'next/font/local'
import './globals.css'
import { Toaster } from '@/components/ui/sonner'
import SessionProvider from '@/components/SessionProvider'

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
})

export const metadata = {
  title: 'Beckon — Fill Your Empty Chairs',
  description:
    'AI-powered personalized offers for local service businesses. Fill slow slots, win back lapsed customers, and grow without Groupon.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} antialiased`}>
        <SessionProvider>
          {children}
          <Toaster richColors position="top-right" />
        </SessionProvider>
      </body>
    </html>
  )
}
