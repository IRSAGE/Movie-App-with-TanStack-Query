export const addMovieToWatchList = async (movieId: number) => {
  const url = "https://api.themoviedb.org/3/account/21050033/watchlist";
  const options = {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      Authorization:
        "Bearer   eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MTg3ZmM4MTc5YzkwYmU4ZjUwMjUzNGNmMjEzMjk4NyIsInN1YiI6IjYyYzJkYTZhNmEzMDBiMDA1OTllNWYxMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.UeQMfkFglpe0rGDn2CAyk3ZtGrEF593zs6oXxj7eNEg",
    },
    body: JSON.stringify({
      media_type: "movie",
      media_id: movieId,
      watchlist: true,
    }),
  };

  const res = await fetch(url, options);

  if (!res.ok) {
    console.log("Not Added...", res);
    throw new Error("Failed to fetch movies");
  }

  const json = await res.json();
  console.log(json);
  return json;
};
