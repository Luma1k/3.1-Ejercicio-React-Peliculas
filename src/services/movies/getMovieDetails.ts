import Config from "@/config";
import { Movie } from "@/types/Movie";

const getMovieDetails = async (id: number): Promise<Movie> => {
  const res = await fetch(`${Config.API_URL}/movie/${id}`, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
      "Content-Type": "application/json;charset=utf-8",
    },
    cache: "no-cache",
  });

  if (!res.ok) throw new Error("No se pudo obtener el detalle de la película");

  return res.json();
};

export default getMovieDetails;
