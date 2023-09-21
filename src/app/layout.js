import { GlobalProvider } from '@/context/Provider'
import './globals.css'
import { Inter } from 'next/font/google'
import FramerLayout from '@/context/FramerLayout'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Quiz App',
  description: 'A fun Quiz app with Next.js and Framer Motion',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* Wrap the entire app in the GlobalProvider to access global states, and FramerLayout */}
        <GlobalProvider>
          <FramerLayout>
            {children}
          </FramerLayout>
        </GlobalProvider>
      </body>
    </html>
  )
}
