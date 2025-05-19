"use client";

import { useEffect, useState } from "react";
import getNowPlayingMovies from "@/services/movies/getNowPlayingMovies";
import { Movie } from "@/types/Movie";
import Header from "@/components/header/header";
import MovieCardList from "@/components/MovieCardList/MovieCardList";
import PaginationControls from "@/components/PaginationControls/PaginationControls";

const NowPlayingPage = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const totalPages = 508; 

  useEffect(() => {
    const fetchNowPlaying = async () => {
      try {
        const data = await getNowPlayingMovies(page);
        setMovies(data.results);
      } catch (e) {
        console.error("No se pudieron cargar las películas en cartelera:", e);
      }
    };

    fetchNowPlaying();
  }, [page]);

  return (
    <div className="bg-[#0f172a] min-h-screen text-white">
      <Header />

      <main className="px-6 py-8 max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-white">🎥 En Cartelera</h1>

        {movies.length === 0 ? (
          <p className="text-gray-400">No hay películas en cartelera ahora mismo.</p>
        ) : (
          <>
            <MovieCardList movies={movies} />
            <div className="mt-10">
              <PaginationControls
                page={page}
                totalPages={totalPages}
                onPageChange={setPage}
              />
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default NowPlayingPage;
