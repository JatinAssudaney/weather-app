import { View, FlatList, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Card from "./card";
import LocationSearch from "./search";
import { Location, WeatherResponse } from "@/types";
import Toast from "react-native-toast-message";
import { MAX_WEATHER_REPORT } from "@/constants/server";
import { getWeather } from "@/api";

const CardList = () => {
  const [cities, setCities] = useState<string[]>([]);
  const [cards, setCards] = useState<WeatherResponse[]>([]);

  useEffect(() => {
    const fetchStoredLocations = async () => {
      try {
        const storedLocations = await AsyncStorage.getItem("storedLocations");
        if (storedLocations) {
          setCities(JSON.parse(storedLocations));
        }
      } catch (error) {
        showErrorToast("Failed to load stored data");
      }
    };

    fetchStoredLocations();
  }, []);

  useEffect(() => {
    const fetchStoredCards = async () => {
      if (!cities.length) return;
      const promises: any = [];
      for (let index = 0; index < cities.length; index++) {
        const name = cities[index];
        const weather = getWeather(name);
        promises.push(weather);
      }
      Promise.allSettled(promises).then((weatherList) => {
        const cards = weatherList
          .map((weather) => {
            if (weather.status === "fulfilled") return weather.value;
            else return null;
          })
          .filter(Boolean);
        setCards(cards);
      });
    };

    fetchStoredCards();
  }, [cities]);

  const renderItem = ({ item }: { item: WeatherResponse }) => {
    return <Card item={item} />;
  };

  const showErrorToast = (message: string) => {
    Toast.show({
      type: "error",
      text1: "Error",
      text2: message,
    });
  };

  const handlePress = async (item: Location) => {
    if (cards.length >= MAX_WEATHER_REPORT) {
      showErrorToast("Sorry 🥺! Max number of cities have been added");
      return;
    }
    try {
      const weather = await getWeather(item.name);
      if (!weather) {
        showErrorToast("Failed to fetch weather data");
        return;
      }
      const newCards = [...cards, weather];
      const newCitites = [...cities, item.name];
      setCities(newCitites);
      setCards(newCards);
      await AsyncStorage.setItem("storedLocations", JSON.stringify(newCitites));
    } catch (error) {
      showErrorToast("Failed to fetch weather data");
    }
  };

  return (
    <View style={styles.cardContainer}>
      <LocationSearch onPress={handlePress} />
      <FlatList
        data={cards}
        renderItem={renderItem}
        keyExtractor={(item) => item.location.name}
        style={styles.cardList}
      />
      <Toast position="top" bottomOffset={20} />
    </View>
  );
};

export default CardList;

const styles = StyleSheet.create({
  cardContainer: {
    width: "90%",
    marginTop: 20,
    flex: 1,
  },
  cardList: {
    zIndex: 0,
    width: "100%",
  },
});
