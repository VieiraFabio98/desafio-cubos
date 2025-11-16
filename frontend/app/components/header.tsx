'use client'
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function Header() {

  const [isDark, setIsDark] = useState(false)
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme")
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark")
      setIsDark(true)
    }
  }, [])

  const toggleTheme = () => {
    const html = document.documentElement

    if (isDark) {
      html.classList.remove("dark")
      localStorage.setItem("theme", "light")
    } else {
      html.classList.add("dark")
      localStorage.setItem("theme", "dark")
    }

    setIsDark(!isDark)
  }

  const pathname = usePathname()
  const showRegisterButton = pathname == "/"
  const router = useRouter()

  const handleRegisterClick = () => {
    router.push("/register")
  }

  return (
    <header className="w-full h-[72px] bg-background text-foreground flex items-center justify-between px-10 border-b border-solid border-foreground z-50">
      <div className="flex items-center gap-4">
        <img
          src="/assets/cubos-logo.png"
          alt="Cubos Logo"
          className={`h-10 w-auto object-contain transition duration-300 ${
            isDark === false ? 'brightness-0' : 'invert brightness-0'
          }`}
        />
        <span className="text-2xl font-semibold tracking-wide">MOVIES</span>
      </div>
      <div className="flex items-center gap-4">
        <button onClick={toggleTheme} className="transition-transform duration-200 hover:scale-130">
          <img
            src={isDark ? "/assets/moon.png" : "/assets/sun.png"}
            alt={isDark ? "Moon" : "Sun"}
            className={`w-5 h-5 cursor-pointer object-contain transition duration-300 ${
              isDark ? "invert brightness-150" : "brightness-0"
            }`}
          />
        </button>
        {showRegisterButton ? (
          <button className="bg-(--button) text-(--button-text) font-medium px-6 py-2 rounded-md transition duration-200 hover:bg-(--button-hover) hover:scale-105 cursor-pointer" onClick={handleRegisterClick}>
            Cadastrar
          </button>
        ) : (
          <button className="bg-(--button) text-(--button-text) font-medium px-6 py-2 rounded-md transition duration-200 hover:bg-(--button-hover) hover:scale-105 cursor-pointer">
            Logout
          </button>
        )}
      </div>
    </header>
  )
}
