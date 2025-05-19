import Config from "@/config";

export const markAsFavorite = async (
  movieId: number,
  favorite: boolean,
  guestSessionId: string
) => {
  const res = await fetch(
    `${Config.API_URL}/account/null/favorite?guest_session_id=${guestSessionId}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({
        media_type: "movie",
        media_id: movieId,
        favorite,
      }),
    }
  );

  if (!res.ok) {
    throw new Error("Error al marcar como favorita");
  }

  return res.json();
};
