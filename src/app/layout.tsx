import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { Providers } from '@/components/providers'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { SmoothScroll } from '@/components/layout/smooth-scroll'
import { CustomCursor } from '@/components/ui/custom-cursor'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'AIRIS - Artificial Intelligence Research and Innovation Society',
  description: 'A student-led society dedicated to exploring the frontiers of Artificial Intelligence, Machine Learning, and Deep Tech innovation.',
  keywords: ['AI', 'Research', 'Innovation', 'Machine Learning', 'Deep Learning', 'Student Society', 'AIRIS'],
  authors: [{ name: 'AIRIS Tech Team' }],
  openGraph: {
    title: 'AIRIS - Awakening Intelligence',
    description: 'Join the collective of visionary students pushing the boundaries of AI.',
    url: 'https://airis.society',
    siteName: 'AIRIS',
    images: [
      {
        url: '/og-image.jpg', // Placeholder
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AIRIS - Awakening Intelligence',
    description: 'Join the collective of visionary students pushing the boundaries of AI.',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased selection:bg-primary/30 font-sans`}
      >
        <Providers>
          <SmoothScroll>
            <CustomCursor />
            <Navbar />
            <main className="min-h-screen">
              {children}
            </main>
            <Footer />
          </SmoothScroll>
        </Providers>
      </body>
    </html>
  )
}
