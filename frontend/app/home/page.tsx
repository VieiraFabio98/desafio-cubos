'use client'

import { useEffect, useState } from "react"
import { Pagination } from "../components/pagination"
import { list } from "../services/http-service"
import { MovieCard } from "../components/movie-card"
import { HomeHeader } from "../components/home-header"

export default function Home() {

  const [currentPage, setCurrentPage] = useState(1)
  const [data, setData] = useState<any[]>([])
  const [hasNext, setHasNext] = useState(false)
  const itemsPerPage = 12

  const indexOfLast = currentPage * itemsPerPage
  const indexOfFirst = indexOfLast - itemsPerPage

  useEffect(() => {
    async function fetchData() {

      const moviesData = await list('movies/list', {})
      const res = await moviesData.json()

      if(res.statusCode === 200) {
        setData(res.data.items)
        setHasNext(res.data.hasNext)
      }
    }
    fetchData()
  }, [])

  const currentMovies = data.slice(indexOfFirst, indexOfLast)

  const totalPages = Math.ceil(data.length / itemsPerPage)

  return (
    <>
      <div className="flex w-full h-[80] items-center gap-5 justify-end px-10">
        <HomeHeader />
      </div>
      <div className="grid grid-cols-6 gap-x-15 gap-y-5 w-full px-10">
      {currentMovies.map(movie => (
          <MovieCard
            key={movie.id}
            id={movie.id}
            title={movie.title}
            genre={movie.genre}
            posterUrl={movie.posterUrl}
          />
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onChange={setCurrentPage}
      />
    </>
  )
}