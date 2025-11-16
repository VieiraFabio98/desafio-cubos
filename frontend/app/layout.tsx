'use client'
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/header";
import Footer from "./components/footer";
import { usePathname } from "next/navigation"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const pathname = usePathname()
  const showBackground = pathname == "/"

  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen bg-background text-foreground font-sans overflow-hidden">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}

{/* <main
          className="flex-1 flex justify-center items-center bg-cover bg-center absolute inset-0"
          style={
            showBackground
              ? {
                  backgroundImage: "url('/assets/background.png')",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                }
              : {}
          }
        >
          <div className="absolute inset-0 bg-background/90 pointer-events-none"></div>
        </main> */}

