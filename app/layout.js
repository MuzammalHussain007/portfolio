import './globals.css'
import CustomCursor from '@/components/ui/CustomCursor'

export const metadata = {
  title: 'Muzammal Hussain — MERN Stack & Mobile App Developer',
  description:
    'Full-stack developer specializing in MERN Stack and Mobile App Development. Building premium web and mobile experiences.',
  keywords: 'MERN Stack, React, Next.js, Node.js, Mobile App Developer, Flutter, Full Stack',
  openGraph: {
    title: 'Muzammal Hussain — Developer',
    description: 'MERN Stack & Mobile App Developer',
    type: 'website',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body suppressHydrationWarning>
        <CustomCursor />
        {children}
      </body>
    </html>
  )
}
