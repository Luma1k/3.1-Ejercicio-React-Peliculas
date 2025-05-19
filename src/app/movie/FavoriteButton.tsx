"use client";

import { useState, useEffect } from "react";
import { useGuestSession } from "@/providers/GuestSessionContext";
import { markAsFavorite } from "@/services/accounts/markAsFavorite";

const FavoriteButton = ({ movieId }: { movieId: number }) => {
  const { guestSessionId } = useGuestSession();
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(`favorite-${movieId}`);
    setIsFavorite(saved === "true");
  }, [movieId]);

  const toggleFavorite = async () => {
    if (!guestSessionId) return;

    try {
      await markAsFavorite(movieId, !isFavorite, guestSessionId);
      localStorage.setItem(`favorite-${movieId}`, (!isFavorite).toString());
      setIsFavorite(!isFavorite);
    } catch (err) {
      console.error("Error al marcar como favorito:", err);
    }
  };

  return (
    <button
      onClick={toggleFavorite}
      className={`mt-4 px-5 py-2 rounded-lg font-semibold flex items-center gap-2 transition-all shadow-md text-white
        ${isFavorite ? "bg-blue-800 hover:bg-blue-900" : "bg-blue-700 hover:bg-blue-800"}`}
    >
      {isFavorite ? "⭐ Favorito" : "⭐ Agregar a favoritos"}
    </button>
  );
};

export default FavoriteButton;
