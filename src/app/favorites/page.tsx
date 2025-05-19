"use client";

import { useEffect, useState } from "react";
import { useGuestSession } from "@/providers/GuestSessionContext";
import getMovieDetails from "@/services/movies/getMovieDetails";
import { Movie } from "@/types/Movie";
import Header from "@/components/header/header";
import MovieCard from "@/components/MovieCard/MovieCard";
import Link from "next/link";

const FavoritesPage = () => {
  const { guestSessionId } = useGuestSession();
  const [favorites, setFavorites] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      const storedFavorites = Object.keys(localStorage).filter((key) =>
        key.startsWith("favorite-")
      );

      const movieIds = storedFavorites
        .filter((key) => localStorage.getItem(key) === "true")
        .map((key) => parseInt(key.replace("favorite-", "")));

      const favoriteMovies: Movie[] = [];
      for (const id of movieIds) {
        try {
          const movie = await getMovieDetails(id);
          favoriteMovies.push(movie);
        } catch (error) {
          console.error("Error fetching favorite movie details:", error);
        }
      }

      setFavorites(favoriteMovies);
    };

    fetchFavorites();
  }, []);

  return (
    <div className="bg-[#0f172a] min-h-screen text-white">
      <Header />

      <main className="px-6 py-8 max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-white">⭐ Tus Películas Favoritas</h1>

        {favorites.length === 0 ? (
          <p className="text-gray-400">No has agregado ninguna película a favoritos.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {favorites.map((movie) => (
              <Link
                key={movie.id}
                href={`/movie/${movie.id}`}
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
        )}
      </main>
    </div>
  );
};

export default FavoritesPage;
