import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Navigation from "@/components/@core/navigation"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "NextJS Gsap Animated Hero Example",
  description: "NextJS Gsap Animated Hero Example",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className={inter.className}>
        <div className="indicator" />
        <Navigation />
        {children}
      </body>
    </html>
  )
}
