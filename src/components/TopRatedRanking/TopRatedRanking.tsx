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
    <div className="toprated-container">
      <div className="toprated-header">
        <Image
          src="/star-full.png"
          alt="Star icon"
          width={48}
          height={48}
          className="ranking-icon"
        />
        <div>
          <h2 className="toprated-title">TMDB TOP 20</h2>
          <p className="toprated-subtitle">CURRENT RANKING</p>
        </div>
      </div>

      <div className="toprated-grid">
        {movies.map((movie, index) => (
          <Link
            key={movie.id}
            href={{
              pathname: `/movie/${movie.id}`,
              query: { from: window.location.pathname },
            }}
            className="toprated-item hover:cursor-pointer"
          >
            <span className="toprated-rank">{startIndex + index}</span>
            <Image
              src={`${Config.IMAGE_SOURCE}${movie.poster_path}`}
              alt={movie.title}
              width={40}
              height={60}
              className="toprated-poster"
            />
            <span className="toprated-movie-title">{movie.title}</span>
            <span className="toprated-score">{movie.vote_average.toFixed(1)}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TopRatedRanking;
