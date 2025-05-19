import api from "../api";

const getPopularMovies = async (page: number = 1) => {
  try {
    const res = await api.get(`/movie/popular?language=en-US&page=${page}`);
    return res.data;
  } catch (e) {
    console.error("Couldn't fetch popular movies: ", e);
    throw e;
  }
};

export default getPopularMovies;
