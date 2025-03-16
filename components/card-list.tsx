import { View, FlatList, StyleSheet } from "react-native";
import React from "react";
import Card from "./card";
import LocationSearch from "./search";
import { WEATHER_DUMMY_DATA } from "@/utils/dummy-data";
import { WeatherResponse } from "@/types";

const CardList = () => {
  const renderItem = ({ item }: { item: WeatherResponse }) => {
    return <Card item={item} />;
  };

  return (
    <View style={styles.cardContainer}>
      <LocationSearch />
      <FlatList
        data={WEATHER_DUMMY_DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.location.name}
        style={styles.cardList}
      />
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
