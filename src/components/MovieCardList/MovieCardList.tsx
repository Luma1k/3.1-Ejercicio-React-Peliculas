"use client";

import Link from "next/link";
import MovieCard from "../MovieCard/MovieCard";
import { Movie } from "@/types/Movie";
import { usePathname } from "next/navigation";

interface MovieCardListInterface {
  movies: Movie[];
}

const MovieCardList: React.FC<MovieCardListInterface> = ({ movies }) => {
  const pathname = usePathname(); // 👈 obtenemos la ruta actual del cliente

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-y-10 gap-x-6 px-4">
      {movies.map((movie) => (
        <Link
          key={movie.id}
          href={{
            pathname: `/movie/${movie.id}`,
            query: { from: pathname }, 
          }}
          className="flex justify-center"
        >
          <MovieCard
            id={movie.id}
            title={movie.title}
            score={movie.vote_average}
            photoPath={movie.poster_path}
            year={new Date(movie.release_date).getFullYear()}
            description={movie.overview}
          />
        </Link>
      ))}
    </div>
  );
};

export default MovieCardList;
