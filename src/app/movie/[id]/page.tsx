import { notFound } from "next/navigation";
import Config from "@/config";
import FavoriteButton from "../FavoriteButton";
import Image from "next/image";
import Header from "@/components/header/header";
import Link from "next/link";

interface MovieDetail {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  release_date: string;
  vote_average: number;
}

interface Recommendation {
  id: number;
  title: string;
  poster_path: string;
}

const getMovie = async (id: string): Promise<MovieDetail | null> => {
  try {
    const res = await fetch(`${Config.API_URL}/movie/${id}`, {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
        "Content-Type": "application/json;charset=utf-8",
      },
      cache: "no-cache",
    });

    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
};

const getRecommendations = async (id: string): Promise<Recommendation[]> => {
  try {
    const res = await fetch(`${Config.API_URL}/movie/${id}/recommendations`, {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
        "Content-Type": "application/json;charset=utf-8",
      },
      cache: "no-cache",
    });

    if (!res.ok) return [];
    const data = await res.json();
    return data.results.slice(0, 10);
  } catch {
    return [];
  }
};


type PageProps = {
  params: {
    id: string;
  };
};

export default async function MovieDetailPage({ params }: PageProps) {
  const id = params.id;

  const movie = await getMovie(id);
  const recommendations = await getRecommendations(id);

  if (!movie) notFound();

  return (
    <div className="bg-[#0f172a] min-h-screen text-white relative">
      <Header />

      {movie.backdrop_path && (
        <div className="absolute inset-0 -z-10 opacity-20">
          <Image
            src={`${Config.IMAGE_SOURCE}${movie.backdrop_path}`}
            alt="Backdrop"
            fill
            className="object-cover blur-sm"
          />
        </div>
      )}

      <main className="px-6 py-8 max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row items-start gap-8">
          {movie.poster_path && (
            <Image
              src={`${Config.IMAGE_SOURCE}${movie.poster_path}`}
              alt={movie.title}
              width={300}
              height={450}
              className="rounded-xl shadow-xl"
            />
          )}

          <div className="flex-1">
            <h1 className="text-4xl font-bold mb-2 text-white">{movie.title}</h1>
            <p className="text-gray-300 text-lg mb-4">{movie.overview}</p>

            <FavoriteButton movieId={movie.id} />

            <div className="mt-6 text-sm space-y-1 text-gray-400">
              <p>
                <span className="text-yellow-400 font-medium">Fecha:</span>{" "}
                {movie.release_date}
              </p>
              <p>
                <span className="text-yellow-400 font-medium">Calificación:</span>{" "}
                {movie.vote_average.toFixed(1)} / 10
              </p>
            </div>
          </div>
        </div>

        {recommendations.length > 0 && (
          <section className="mt-12">
            <h2 className="text-2xl font-bold mb-4 text-white">🎬 Recomendaciones</h2>
            <div className="flex gap-4 overflow-x-auto pb-4">
              {recommendations.map((rec) => (
                <Link
                  key={rec.id}
                  href={`/movie/${rec.id}`}
                  className="min-w-[160px] flex-shrink-0"
                >
                  <Image
                    src={`${Config.IMAGE_SOURCE}${rec.poster_path}`}
                    alt={rec.title}
                    width={160}
                    height={240}
                    className="rounded-lg shadow-md hover:scale-105 transition-transform"
                  />
                  <p className="text-sm mt-2 text-center text-white">{rec.title}</p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
