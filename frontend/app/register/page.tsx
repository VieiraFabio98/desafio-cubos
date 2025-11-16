'use client'
import { useState } from "react"
import { post } from "../services/http-service"
import { useRouter } from "next/navigation"

export default function Register() {
  const router = useRouter()

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [passwordConfirmation, setPasswordConfirmation] = useState("")
  
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const data = await post("users", { 
        name, 
        password,
        email
      })
      const res = await data.json()
  
      if(res.statusCode === 201) {
        authenticate()
      }
  
      console.log('Erro ao efetuar login')
        
        
    } catch (err) {
      console.log("Erro. Tente novamente.", err)
    } 
  }

  const authenticate = async () => {
    try {
      const data = await post("auth", { email, password })
      const res = await data.json()

      if(res.statusCode === 201) {
        localStorage.setItem("token", res.token)
        localStorage.setItem("expiresAt", res.expiresAt)
        router.push("/home")
      }

      console.log('Erro ao efetuar login')
    } catch(err) {
      console.log("Erro. Tente novamente.", err)
    }
  }

  return (
    <div className="absolute z-10 flex flex-1 justify-center items-center w-full h-full">
      <form onSubmit={handleSubmit}>
        <div className="flex justify-center items-center w-full h-screen">
          <div className="w-[412px]  bg-(--card-background) rounded-lg shadow-lg p-6">
      
            <div className="flex flex-col mb-4">
              <label className="text-sm text-gray-300 mb-1">Nome</label>
              <input id="name" name="name" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Digite seu nome" className="bg-[#2A2A2A] text-gray-200 text-sm rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-purple-500"/>
            </div>

            <div className="flex flex-col mb-4">
              <label className="text-sm text-gray-300 mb-1">Email</label>
              <input id="email" name="email" type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Digite seu e-mail" className="bg-[#2A2A2A] text-gray-200 text-sm rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-purple-500"/>
            </div>

            <div className="flex flex-col mb-3">
              <label className="text-sm text-gray-300 mb-1">Senha</label>
              <input id="password" name="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Digite sua senha" className="bg-[#2A2A2A] text-gray-200 text-sm rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-purple-500"/>
            </div>

            <div className="flex flex-col mb-3">
              <label className="text-sm text-gray-300 mb-1">Confirmação de senha</label>
              <input id="passwordConfirmation" name="passwordConfirmation" type="password" value={passwordConfirmation} onChange={(e) => setPasswordConfirmation(e.target.value)} placeholder="Digite sua senha novamente" className="bg-[#2A2A2A] text-gray-200 text-sm rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-purple-500"/>
            </div>
            
            <div className="flex justify-between items-center mt-4 mb-1">
              <button  type="submit" className="bg-purple-600 hover:bg-purple-700 text-white text-sm px-5 py-2 rounded-md">Cadastrar</button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}