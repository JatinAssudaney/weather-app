import { View, Text, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { getWeather } from "@/api";
import WeatherDetail from "@/components/weather-detail";
import { WeatherResponse } from "@/types";

interface CardDetailState {
  isLoading: boolean;
  weather: WeatherResponse | null;
  error: Error | null;
}

const CardDetail = () => {
  const params = useLocalSearchParams();
  const name = params.name as string;
  const [state, setState] = useState<CardDetailState>({
    isLoading: true,
    weather: null,
    error: null,
  });

  useEffect(() => {
    (async () => {
      const weather = await getWeather(name);
      if (weather) setState({ weather, isLoading: false, error: null });
      else
        setState({
          weather: null,
          isLoading: false,
          error: new Error("No weather found"),
        });
    })();
  }, [name]);

  return (
    <View style={styles.app}>
      {state.isLoading ? (
        <Text>Loading...</Text>
      ) : state.weather ? (
        <WeatherDetail item={state.weather} />
      ) : (
        <Text>No weather found</Text>
      )}
    </View>
  );
};

export default CardDetail;

const styles = StyleSheet.create({
  app: {
    flex: 1,
    marginHorizontal: 20,
  },
});
