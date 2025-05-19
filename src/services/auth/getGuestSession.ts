import Config from "@/config";

export const getGuestSession = async () => {
  const response = await fetch(`${Config.API_URL}/authentication/guest_session/new`, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
      "Content-Type": "application/json;charset=utf-8",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch guest session");
  }

  return response.json();
};
