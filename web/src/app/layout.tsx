import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { AuthContextProvider } from '@/context/AuthContext'
import { Header } from "./header"
import { Container } from '@mui/material'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthContextProvider>
          <Header />
          {children}
        </AuthContextProvider>
      </body>
    </html>
  )
}
