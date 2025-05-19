"use client";

import { useEffect, useState } from "react";
import MovieCardList from "@/components/MovieCardList/MovieCardList";
import { Movie } from "@/types/Movie";
import getPopularMovies from "@/services/movies/getPopularMovies";
import Header from "@/components/header/header";
import PaginationControls from "@/components/PaginationControls/PaginationControls";
import "./popular.css";

const PopularMoviesPage = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const totalPages = 508;

  useEffect(() => {
    const fetchPopularMovies = async () => {
      try {
        const data = await getPopularMovies(page);
        setMovies(data.results);
      } catch (e) {
        console.error("Couldn't load movies: ", e);
      }
    };

    fetchPopularMovies();
  }, [page]);

  return (
    <div className="page-background">
      <Header />
      <div className="popular-section">
        <h2 className="page-title">🎬 Popular Movies</h2>
        <MovieCardList movies={movies} />
        <div className="mt-10">
          <PaginationControls
            page={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </div>
      </div>
    </div>
  );
};

export default PopularMoviesPage;
