import Header from "@/components/header/header";
import MovieCardList from "@/components/MovieCardList/MovieCardList";
import { Movie } from "@/types/Movie";
import Config from "@/config";

async function fetchMovies(type: string): Promise<Movie[]> {
  const res = await fetch(`${Config.API_URL}/movie/${type}?language=en-US&page=1`, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
      "Content-Type": "application/json;charset=utf-8",
    },
    cache: "no-cache",
  });

  if (!res.ok) return [];
  const data = await res.json();
  return data.results;
}

export default async function Home() {
  const [popular, topRated, nowPlaying] = await Promise.all([
    fetchMovies("popular"),
    fetchMovies("top_rated"),
    fetchMovies("now_playing"),
  ]);

  return (
    <div className="bg-[#0f172a] text-white min-h-screen">
      <Header />

      <section className="px-6 py-10">
        <h2 className="text-3xl font-bold mb-6 text-white">🎬 Popular Movies</h2>
        <MovieCardList movies={popular} />
      </section>

      <section className="px-6 py-10">
        <h2 className="text-3xl font-bold mb-6 text-white">⭐ Top Rated Movies</h2>
        <MovieCardList movies={topRated} />
      </section>

      <section className="px-6 py-10">
        <h2 className="text-3xl font-bold mb-6 text-white">🎥 Now Playing Movies</h2>
        <MovieCardList movies={nowPlaying} />
      </section>
    </div>
  );
}
