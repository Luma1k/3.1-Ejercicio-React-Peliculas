"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import Config from "@/config";
import "./topratedranking.css";

interface Movie {
  id: number;
  title: string;
  vote_average: number;
  poster_path: string;
}

interface TopRatedRankingProps {
  movies: Movie[];
  startIndex?: number;
}

const TopRatedRanking = ({ movies, startIndex = 1 }: TopRatedRankingProps) => {
  return (
    <div className="toprated-container px-4 md:px-0">
      <div className="toprated-header flex items-center gap-4 mb-6">
        <Image
          src="/star-full.png"
          alt="Star icon"
          width={48}
          height={48}
          className="ranking-icon"
        />
        <div>
          <h2 className="toprated-title text-xl md:text-2xl font-bold">TMDB TOP </h2>
          <p className="toprated-subtitle text-sm md:text-base text-gray-400">CURRENT RANKING</p>
        </div>
      </div>

      <div className="toprated-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {movies.map((movie, index) => (
          <Link
            key={movie.id}
            href={{
              pathname: `/movie/${movie.id}`,
              query: { from: window.location.pathname },
            }}
            className="toprated-item flex items-center gap-4 bg-[#1e293b] rounded-lg p-3 shadow-md hover:scale-[1.01] transition-transform"
          >
            <span className="toprated-rank text-yellow-400 text-lg font-bold w-6">
              {startIndex + index}
            </span>
            <Image
              src={`${Config.IMAGE_SOURCE}${movie.poster_path}`}
              alt={movie.title}
              width={40}
              height={60}
              className="toprated-poster rounded"
            />
            <div className="flex flex-col overflow-hidden">
              <span className="toprated-movie-title text-white font-semibold truncate max-w-[140px]">
                {movie.title}
              </span>
              <span className="toprated-score text-sm text-gray-400">
                ⭐ {movie.vote_average.toFixed(1)}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TopRatedRanking;