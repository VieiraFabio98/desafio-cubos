'use client'

import { useRouter } from "next/navigation"

export function HomeHeader() {

  const router = useRouter()

  function handleAddMovie() {
    router.push('movies/new')
  }

  return (
    <>
      <div className="relative w-[488px]">
        <input
          type="text"
          placeholder="Pesquisar por filmes"
          className="w-full h-11 px-4 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <img
          src="/assets/search.png"
          alt="Buscar"
          className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 invert"
        />
      </div>
      <label>Filtros</label>
      <button onClick={handleAddMovie} type="submit" className="bg-purple-600 hover:bg-purple-700 text-white text-sm px-5 py-2 rounded-md h-11">Adicionar filme</button>
    </>
  )
}