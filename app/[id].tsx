import { fetchMovie } from "@/api/movies";
import { Stack, useLocalSearchParams } from "expo-router";
import { View, ActivityIndicator, Image, Pressable, Alert } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { addMovieToWatchList } from "@/api/watchList";
import { Text } from "@/components/Themed";

const MovieDetails = () => {
  const { id } = useLocalSearchParams();
  const client = useQueryClient();

  const {
    data: movie,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["movies", id],
    queryFn: () => fetchMovie(Number(id)),
  });

  const { mutate } = useMutation({
    mutationFn: () => addMovieToWatchList(Number(id)),
    onSuccess: () => {
      Alert.alert("Movie Added To Wactch List.");
      client.invalidateQueries(["watchlist"]);
    },
  });

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>Failed to fetch data</Text>;
  }

  return (
    <View>
      <Stack.Screen options={{ title: movie.title }} />
      <Image
        source={{
          uri: "https://image.tmdb.org/t/p/w500" + movie.backdrop_path,
        }}
        style={{ width: "100%", height: 300 }}
      />
      <View style={{ padding: 10 }}>
        <Text style={{ fontSize: 30, fontWeight: "500", marginVertical: 10 }}>
          {movie.title}
        </Text>
        <View style={{ marginVertical: 10 }}>
          <Pressable
            onPress={() => mutate()}
            style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
          >
            <FontAwesome name="bookmark-o" size={24} color="black" />
            <Text>Add to watchlist</Text>
          </Pressable>
        </View>
        <Text style={{ fontSize: 16 }}>{movie.overview}</Text>
      </View>
    </View>
  );
};

export default MovieDetails;
