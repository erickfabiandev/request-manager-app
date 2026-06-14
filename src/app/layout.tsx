import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { StoreProvider } from '@/presentation/store/StoreProvider'
import { MainLayout } from '@/presentation/components/Layout'
// @ts-ignore: Implicit CSS import for Next.js global stylesheet
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Request Manager',
  description: 'Gestor de solicitudes internas',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <StoreProvider>
          <MainLayout>
            {children}
          </MainLayout>
        </StoreProvider>
      </body>
    </html>
  )
}