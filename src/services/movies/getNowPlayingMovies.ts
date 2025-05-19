import Config from "@/config";

const getNowPlayingMovies = async (page: number = 1) => {
  const res = await fetch(`${Config.API_URL}/movie/now_playing?language=es-MX&page=${page}`, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
      "Content-Type": "application/json;charset=utf-8",
    },
    cache: "no-cache",
  });

  if (!res.ok) throw new Error("No se pudo obtener la cartelera");

  return res.json();
};

export default getNowPlayingMovies;

