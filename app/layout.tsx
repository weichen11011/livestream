import '@/app/globals.css'
import { Header } from '@/components/header/header'
import { MySessionProvider } from '@/components/provider/session'
import { MyThemeProvider } from '@/components/provider/theme'
import { MyUsersProvider } from '@/components/provider/users'
import { Separator } from '@/components/ui/separator'
import { Toaster } from '@/components/ui/toaster'
import prisma from '@/lib/prisma'
import { cn } from '@/lib/utils'
import { Analytics } from '@vercel/analytics/react'
import type { Metadata } from 'next'
import { Fira_Code } from 'next/font/google'
import { SpeedInsights } from "@vercel/speed-insights/next"

export const fira = Fira_Code({
  subsets: ['latin'],
  variable: "--font-mono",
})

export const metadata: Metadata = {
  metadataBase: new URL('https://nqu.live'),
  title: 'NQU.Live',
  description: 'NQU Live',
  openGraph: {
    images: '/og.png',
  },
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const users = await prisma.user.findMany()
  if (users) return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("min-h-[100dvh] bg-background font-mono antialiased grid", fira.variable)} style={{ gridTemplateRows: "3.5rem 1px" }}>
        <MyThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <MyUsersProvider users={users}>
              <MySessionProvider>
                <Header />
                  <Separator />
                  {children}
                  <div className=" z-10 fixed">
                    <Toaster />
                  </div>
                <Analytics />
              </MySessionProvider>
            </MyUsersProvider>
        </MyThemeProvider>
      </body>
    </html>
  )
}
