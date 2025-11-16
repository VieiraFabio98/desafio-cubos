'use client'

import { useRouter } from "next/navigation"

interface MovieCardProps {
  id: string
  title: string
  genre: string
  posterUrl: string
}

export function MovieCard({ id, title, genre, posterUrl }: MovieCardProps) {

  const router = useRouter()
  
  return (
    <div key={id} onClick={() => router.push(`/movies/${id}`)} className="relative rounded-lg overflow-hidden bg-card hover:scale-105 duration-200 cursor-pointer">
      <img 
        src={posterUrl}
        alt={title} 
        className="w-full h-[320px] object-cover"
      />

      <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent px-2 py-3">
        <h3 className="text-white font-bold text-sm uppercase truncate">
          {title}
        </h3>
        <p className="text-gray-300 text-xs truncate">{genre}</p>
      </div>
    </div>
  )
}