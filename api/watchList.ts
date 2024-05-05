export const addMovieToWatchList = async (movieId: number) => {
  const url = `${process.env.API_URL}account/21050033/watchlist`;
  const options = {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      Authorization: "Bearer " + process.env.API_KEY,
    },
    body: JSON.stringify({
      media_type: "movie",
      media_id: movieId,
      watchlist: true,
    }),
  };

  const res = await fetch(url, options);

  if (!res.ok) {
    throw new Error("Failed to fetch movies");
  }

  const json = await res.json();
  return json;
};

export const fetchWatchlistMovies = async ({ pageParam }) => {
  const url = `${process.env.API_URL}account/21050033/watchlist/movies?language=en-US&page=${pageParam}&sort_by=created_at.desc`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: "Bearer " + process.env.API_KEY,
    },
  };

  const res = await fetch(url, options);

  if (!res.ok) {
    throw new Error("Failed to fetch movies");
  }

  const json = await res.json();
  return json.results;
};
