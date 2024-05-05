const apiKey =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MTg3ZmM4MTc5YzkwYmU4ZjUwMjUzNGNmMjEzMjk4NyIsInN1YiI6IjYyYzJkYTZhNmEzMDBiMDA1OTllNWYxMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.UeQMfkFglpe0rGDn2CAyk3ZtGrEF593zs6oXxj7eNEg";

const headers = {
  accept: "application/json",
  Authorization: "Bearer " + apiKey,
};
export const fetchTopRatedMovies = async ({ pageParam }) => {
  const options = {
    method: "GET",
    headers,
  };

  const url = `https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=${pageParam}`;

  const res = await fetch(url, options);

  if (!res.ok) {
    throw new Error("Failed to fetch movies");
  }

  const json = await res.json();
  return json.results;
};

export const fetchMovie = async (id: number) => {
  const url = `https://api.themoviedb.org/3/movie/${id}?language=en-US`;
  const options = {
    method: "GET",
    headers,
  };

  const res = await fetch(url, options);

  if (!res.ok) {
    throw new Error("Failed to fetch movies");
  }

  const json = await res.json();
  return json;
};
