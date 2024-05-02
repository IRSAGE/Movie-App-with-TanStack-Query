const apiKey =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MTg3ZmM4MTc5YzkwYmU4ZjUwMjUzNGNmMjEzMjk4NyIsInN1YiI6IjYyYzJkYTZhNmEzMDBiMDA1OTllNWYxMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.UeQMfkFglpe0rGDn2CAyk3ZtGrEF593zs6oXxj7eNEg";

export const fetchTopRatedMovies = async () => {
  const url =
    "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1";

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: "Bearer " + apiKey,
    },
  };
  const res = await fetch(url, options);

  if (!res.ok) {
    throw new Error("Failed to fetch movies");
  }

  const json = await res.json();
  return json.results;
};
