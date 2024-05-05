const headers = {
  accept: "application/json",
  Authorization: "Bearer " + process.env.API_KEY,
};
export const fetchTopRatedMovies = async ({ pageParam }) => {
  const options = {
    method: "GET",
    headers,
  };

  const url = `${process.env.API_URL}movie/top_rated?language=en-US&page=${pageParam}`;
  const res = await fetch(url, options);

  if (!res.ok) {
    throw new Error("Failed to fetch movies");
  }

  const json = await res.json();
  return json.results;
};

export const fetchMovie = async (id: number) => {
  const url = `${process.env.API_URL}movie/${id}?language=en-US`;
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
