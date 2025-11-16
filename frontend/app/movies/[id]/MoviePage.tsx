'use client'

import { get } from "@/app/services/http-service"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"


export default function MoviePage() {

  const params = useParams()
  const id = params.id as string

  const [movie, setMovie] = useState<any>(null)
  
  useEffect(() => {
    async function fetchMovie() {
      try {
        const response = await get(`movies/${id}`)
        const movie = await response.json()
        console.log(movie)
        setMovie(movie.data)
      } catch(err) {
        console.log(err)
      }
    }

    fetchMovie()
  }, [id])

  if (!movie) return <p>Carregando...</p>

  return(
    <>
      <div className="flex gap-10 p-5 text-white">
        <div>
          <img
            src={movie.posterUrl}
            alt={movie.title}
            className="w-64 h-88 rounded-lg shadow-lg object-cover"
          />
        </div>

        <div className="flex-1 flex flex-col gap-6">

          <div>
            <h1 className="text-4xl font-bold">{movie.title}</h1>
            <p className="text-gray-400">Título original: {movie.originalTitle}</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">Sinopse</h2>
            <p className="text-gray-300 leading-relaxed">
              {movie.description}
            </p>
          </div>

          {movie.genre && (
            <div className="flex gap-3 mt-4">
              <span className="px-3 py-1 bg-purple-600 rounded-full text-sm">
                {movie.genre}
              </span>
            </div>
          )}

          <div className="grid grid-cols-3 gap-4 mt-6">

            <div className="bg-white/10 p-4 rounded-lg">
              <div className="text-gray-400 text-sm">Duração</div>
              <div className="text-lg font-semibold">{movie.duration}</div>
            </div>

            <div className="bg-white/10 p-4 rounded-lg">
              <div className="text-gray-400 text-sm">Diretor</div>
              <div className="text-lg font-semibold">{movie.director}</div>
            </div>

            <div className="bg-white/10 p-4 rounded-lg">
              <div className="text-gray-400 text-sm">Lançamento</div>
                <div className="text-lg font-semibold">
                {new Date(movie.releaseDate).toLocaleDateString('pt-BR')}
                </div>
            </div>

          </div>
        </div>
      </div>

      <div className="px-6">
        {movie.youtubeUrl && (
          <div className="flex flex-col items-center mt-8">
            <h2 className="text-xl font-semibold mb-4">Trailer</h2>
            <iframe
              src={movie.youtubeUrl.replace("watch?v=", "embed/")}
              title={`${movie.title} Trailer`}
              width="50%"     
              height="300"      
              allowFullScreen
              className="rounded-lg"
            ></iframe>
          </div>
        )}
      </div>
    </>
  )

}
