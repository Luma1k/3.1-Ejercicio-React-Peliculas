"use client";

import { useEffect, useState } from "react";
import Header from "@/components/header/header";
import TopRatedRanking from "@/components/TopRatedRanking/TopRatedRanking";
import getTopRatedMovies from "@/services/movies/getTopRatedMovies";
import { Movie } from "@/types/Movie";
import PaginationControls from "@/components/PaginationControls/PaginationControls";
import "./toprated.css";

const TopRatedMoviesPage = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const totalPages = 508;

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const data = await getTopRatedMovies(page);
        setMovies(data.results);
      } catch (e) {
        console.error("Error fetching top rated movies:", e);
      }
    };
    fetchMovies();
  }, [page]);

  return (
    <div className="page-background">
      <Header />
      <div className="toprated-section">
        <h2 className="page-title">⭐ Top Rated Movies</h2>
        <TopRatedRanking movies={movies} />
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

export default TopRatedMoviesPage;
