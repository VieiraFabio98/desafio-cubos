'use client'

import { useState } from "react"
import { post } from "./services/http-service"
import { useRouter } from "next/navigation"

export default function Login() {
  const router = useRouter()
  const [userIdentifier, setUserIdentifier] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const data = await post("auth", { userIdentifier, password })
      const res = await data.json()

      if(res.statusCode === 201) {
        localStorage.setItem("token", res.data.token)
        localStorage.setItem("expiresAt", res.data.expiresAt)
        router.push("/home")
      } else {
        console.log('Erro ao efetuar login')
      }

    } catch (err) {
      console.log("Erro. Tente novamente.", err)
    } 
  }

  function handleRegister() {
    router.push('register')
  }

  return (
    <div className="absolute z-10 flex flex-1 justify-center items-center w-full h-full">
      <form onSubmit={handleSubmit}>
        <div className="flex justify-center items-center w-full h-screen">
          <div className="w-[412px] h-[242px] bg-(--card-background) rounded-lg shadow-lg p-6">
      
            <div className="flex flex-col mb-4">
              <label className="text-sm text-gray-300 mb-1">Nome/E-mail</label>
              <input id="userIdentifier" name="userIdentifier" type="text" value={userIdentifier} onChange={(e) => setUserIdentifier(e.target.value)} placeholder="Digite seu nome/E-mail" className="bg-[#2A2A2A] text-gray-200 text-sm rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-purple-500"/>
            </div>

            <div className="flex flex-col mb-3">
              <label className="text-sm text-gray-300 mb-1">Senha</label>
              <input id="password" name="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Digite sua senha" className="bg-[#2A2A2A] text-gray-200 text-sm rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-purple-500"/>
            </div>
            
            <div className="flex justify-between items-center mt-4 mb-1">
              <button onClick={handleRegister}   className="bg-purple-600 hover:bg-purple-700 text-white text-sm px-5 py-2 rounded-md">Cadastrar</button>
              <button type="submit" className="bg-purple-600 hover:bg-purple-700 text-white text-sm px-5 py-2 rounded-md">Entrar</button>
            </div>
              <a href="#"className="text-sm text-purple-400 hover:underline">Esqueci minha senha</a>
          </div>
        </div>
      </form>
    </div>
  )
}
