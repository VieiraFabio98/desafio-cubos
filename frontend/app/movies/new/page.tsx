'use client'

import { post } from "@/app/services/http-service"
import { useRouter } from "next/navigation"
import { useRef, useState } from "react"

export default function NewMovie() {

  const router = useRouter()

  const [title, setTitle] = useState("")
  const [originalTitle, setOriginalTitle] = useState("")
  const [description, setDescription] = useState("")
  const [duration, setDuration] = useState("")
  const [genre, setGenre] = useState("")
  const [director, setDirector] = useState("")
  const [releaseDate, setReleaseDate] = useState("")
  const [posterFile, setPosterFile] = useState<File | null>(null)

  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try{
      const movie = await post("movies", {
        title,
        originalTitle,
        description,
        duration: duration + 'minutos',
        genre,
        director,
        releaseDate,
        file: posterFile 
      })

      const res = await movie.json()

      if(res.statusCode == 201) {
        router.push('/home')
      }

    }catch(err) {
      console.log("Erro. Tente novamente.", err)
    }
  }

  const fileInputRef = useRef<HTMLInputElement | null>(null)
  function handleSelectFile() {
    fileInputRef.current?.click()
  }

  function handleChangeFile(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files.length > 0) {
      setPosterFile(e.target.files[0])
    }
  }

  const genres = [
    "Ação",
    "Aventura",
    "Animação",
    "Comédia",
    "Crime",
    "Documentário",
    "Drama",
    "Fantasia",
    "Ficção Científica",
    "Guerra",
    "Mistério",
    "Musical",
    "Romance",
    "Suspense",
    "Terror",
  ]

  return (
    <div className="absolute z-10 flex flex-1 justify-center items-center w-full h-full">
      <form onSubmit={handleSubmit}>
        <div className="flex justify-center items-center w-full h-screen">
          <div className="w-[412px] bg-(--card-background) rounded-lg shadow-lg p-6">

            <div className="flex flex-col mb-4">
              <label className="text-sm text-gray-300 mb-1">Título</label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Digite o título"
                className="bg-[#2A2A2A] text-gray-200 text-sm rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div className="flex flex-col mb-4">
              <label className="text-sm text-gray-300 mb-1">Título Original</label>
              <input
                id="originalTitle"
                type="text"
                value={originalTitle}
                onChange={(e) => setOriginalTitle(e.target.value)}
                placeholder="Digite o título original"
                className="bg-[#2A2A2A] text-gray-200 text-sm rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div className="flex flex-col mb-4">
              <label className="text-sm text-gray-300 mb-1">Descrição</label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Digite a descrição"
                className="bg-[#2A2A2A] text-gray-200 text-sm rounded-md px-3 py-2 h-20 outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div className="flex flex-col mb-4">
              <label className="text-sm text-gray-300 mb-1">Duração (minutos)</label>
              <input
                id="duration"
                type="number"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                placeholder="Digite a duração"
                className="bg-[#2A2A2A] text-gray-200 text-sm rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div className="flex flex-col mb-4">
              <label className="text-sm text-gray-300 mb-1">Gênero</label>
              <select
                id="genre"
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
                className="bg-[#2A2A2A] text-gray-200 text-sm rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="">Selecione um gênero</option>

                {genres.map((g) => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col mb-4">
              <label className="text-sm text-gray-300 mb-1">Diretor</label>
              <input
                id="director"
                type="text"
                value={director}
                onChange={(e) => setDirector(e.target.value)}
                placeholder="Digite o nome do diretor"
                className="bg-[#2A2A2A] text-gray-200 text-sm rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div className="flex flex-col mb-4">
              <label className="text-sm text-gray-300 mb-1">Data de Lançamento</label>
              <input
                id="releaseDate"
                type="date"
                value={releaseDate}
                onChange={(e) => setReleaseDate(e.target.value)}
                className="bg-[#2A2A2A] text-gray-200 text-sm rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div className="flex justify-between items-center mt-4 mb-1">
              <button type="submit" className="bg-purple-600 hover:bg-purple-700 text-white text-sm px-5 py-2 rounded-md">
                Cadastrar Filme
              </button>
             <button
                type="button"
                onClick={handleSelectFile}
                className="bg-purple-600 hover:bg-purple-700 text-white text-sm px-5 py-2 rounded-md"
              >
                {posterFile ? "Imagem Selecionada ✔" : "Selecionar Imagem"}
              </button>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleChangeFile}
            />

          </div>
        </div>
      </form>
    </div>
  )
}