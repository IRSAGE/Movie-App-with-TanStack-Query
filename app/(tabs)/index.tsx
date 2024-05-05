import { ActivityIndicator, FlatList, StyleSheet, Text } from "react-native";
import { View } from "@/components/Themed";
import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchTopRatedMovies } from "@/api/movies";
import MovieListItem from "@/components/MovieListItem";

export default function TabOneScreen() {
  const { data, isLoading, error, fetchNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: ["movies"],
      queryFn: fetchTopRatedMovies,
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
