import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import Colors from "@/constants/Colors";
import { getTemperatureIcon } from "@/utils/temperature";
import { router } from "expo-router";
import { TemperatureCodeKey, WeatherResponse } from "@/types";

interface CardProps {
  item: WeatherResponse;
}

const Card = ({ item }: CardProps) => {
  const handlePress = () => {
    router.push(`/details/${item.location.name}`);
  };
  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      <View>
        <Text style={styles.temperature}>{item.current.temp_c}°</Text>
        <View style={styles.temperatureRange}>
          <Text
            style={styles.subText}
          >{`Feels: ${item.current.feelslike_c}°`}</Text>
          <Text
            style={styles.subText}
          >{`Humidity: ${item.current.humidity}`}</Text>
        </View>
        <Text
          style={styles.subText}
        >{`${item.location.name}, ${item.location.region}`}</Text>
      </View>
      <View style={styles.temperatureDetails}>
        {getTemperatureIcon(
          item.current.condition.code as TemperatureCodeKey,
          item.current.is_day === 1 ? true : false
        )}
        <Text style={styles.subText}>{item.current.condition.text}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default Card;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 32,
    paddingHorizontal: 16,
    marginVertical: 12,
    backgroundColor: Colors.dark.cardGradientStart,
    borderRadius: 8,
  },
  temperature: {
    color: Colors.dark.text,
    fontSize: 64,
  },
  temperatureRange: {},
  subText: {
    fontSize: 18,
    color: Colors.dark.secondaryText,
  },
  temperatureDetails: {
    alignItems: "center",
    justifyContent: "space-between",
  },
});
