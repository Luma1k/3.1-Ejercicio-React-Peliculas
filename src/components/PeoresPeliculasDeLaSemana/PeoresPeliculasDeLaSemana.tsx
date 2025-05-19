"use client";

import Image from "next/image";
import Link from "next/link";
import { Movie } from "@/types/Movie";

interface Props {
  movies: Movie[];
}

export default function PeoresPeliculasDeLaSemana({ movies }: Props) {
  return (
    <section className="bg-[#0f172a] text-white py-10 px-6">
      <h2 className="text-3xl font-bold mb-6 text-white">👎 Peores Películas de la Semana</h2>
      <div className="flex gap-4 overflow-x-auto pb-4">
        {movies.map((movie) => (
          <Link
            key={movie.id}
            href={`/movie/${movie.id}`}
            className="min-w-[180px] flex-shrink-0 bg-[#1e293b] rounded-xl overflow-hidden shadow-md hover:scale-105 transition-transform"
          >
            <Image
              src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
              alt={movie.title}
              width={180}
              height={270}
              className="w-full h-[270px] object-cover"
            />
            <div className="p-3">
              <h3 className="text-base font-semibold text-white line-clamp-1">
                {movie.title}
              </h3>
              <p className="text-sm text-gray-400">({new Date(movie.release_date).getFullYear()})</p>
              <p className="text-xs text-red-400">⭐ {movie.vote_average.toFixed(1)}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
