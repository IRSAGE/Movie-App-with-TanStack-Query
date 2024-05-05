import { ActivityIndicator, FlatList, StyleSheet, Text } from "react-native";
import { View } from "@/components/Themed";
import { useInfiniteQuery } from "@tanstack/react-query";
import MovieListItem from "@/components/MovieListItem";
import { fetchWatchlistMovies } from "@/api/watchList";

export default function WatchList() {
  const { data, isLoading, error, fetchNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: ["watchlist"],
      queryFn: fetchWatchlistMovies,
      initialPageParam: 1,
      getNextPageParam: (lastPage, pages) => pages.length + 1,
    });
  const movies = data?.pages?.flat();
  if (isLoading) {
    return <ActivityIndicator />;
  }
  if (error) {
    return <Text>{error.message}</Text>;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={movies}
        numColumns={2}
        contentContainerStyle={{ gap: 5, padding: 5 }}
        columnWrapperStyle={{ gap: 5 }}
        renderItem={({ item }) => <MovieListItem movie={item} />}
        onEndReached={() => {
          hasNextPage && fetchNextPage();
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
