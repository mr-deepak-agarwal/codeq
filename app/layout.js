import { Inter, Space_Grotesk } from 'next/font/google'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap'
})

const spaceGrotesk = Space_Grotesk({ 
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap'
})

export const metadata = {
  title: 'CodeQ - AI-Powered Development Agency | Build Intelligent Digital Products',
  description: 'Global AI-powered development agency building intelligent web applications, SaaS platforms, ERP systems, and business automation tools for startups and enterprises.',
  keywords: 'AI development, web development, SaaS development, ERP systems, business automation, Next.js, React, AI applications',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className={inter.className}>{children}</body>
    </html>
  )
}