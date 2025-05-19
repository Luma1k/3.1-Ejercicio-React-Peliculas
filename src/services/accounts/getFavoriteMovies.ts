import Config from "@/config";

export const getFavoriteMovies = async (guestSessionId: string) => {
  const res = await fetch(
    `${Config.API_URL}/guest_session/${guestSessionId}/rated/movies?language=en-US&page=1`,
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
        "Content-Type": "application/json;charset=utf-8",
      },
    }
  );

  if (!res.ok) {
    throw new Error("Error al obtener películas favoritas");
  }

  return res.json();
};
