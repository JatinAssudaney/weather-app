import { View, StyleSheet, ScrollView } from "react-native";
import React from "react";
import { TemperatureCodeKey, WeatherResponse } from "@/types";
import WeatherCard, { WeatherCardProps } from "./weather-card";
import { getTemperatureIcon } from "@/utils/temperature";
import Colors from "@/constants/Colors";

interface WeatherDetailProps {
  item: WeatherResponse;
}

const WeatherDetail = ({ item }: WeatherDetailProps) => {
  const data: WeatherCardProps[] = [
    {
      icon: "thermometer-lines",
      title: "Temperature Feels Like",
      value: `${item.current.feelslike_c} °C`,
      fullWidth: true,
      children: getTemperatureIcon(
        item.current.condition.code as TemperatureCodeKey,
        item.current.is_day === 1 ? true : false
      ),
    },
    {
      icon: "weather-sunny",
      title: "UV Index",
      value: `${item.current.uv}`,
      fullWidth: false,
    },
    {
      icon: "weather-windy",
      title: "Wind",
      value: `${item.current.wind_kph}`,
      fullWidth: false,
      unit: "km/h",
    },
    {
      icon: "air-filter",
      title: "Humidity",
      value: `${item.current.humidity}`,
      fullWidth: true,
      unit: "%",
    },
    {
      icon: "water",
      title: "Rainfall",
      value: `${item.current.precip_mm}`,
      fullWidth: false,
      unit: "mm",
    },
    {
      icon: "eye",
      title: "Visibility",
      value: `${item.current.vis_km}`,
      fullWidth: false,
      unit: "km",
    },
    {
      icon: "fire-alert",
      title: "Heat Index",
      value: `${item.current.heatindex_c} °C`,
      fullWidth: false,
    },
    {
      icon: "coolant-temperature",
      title: "Pressure",
      value: `${item.current.pressure_mb}`,
      fullWidth: false,
    },
  ];

  return (
    <ScrollView contentContainerStyle={styles.weatherContainer}>
      {data.map((item) => (
        <View
          key={item.title}
          style={{ width: item.fullWidth ? "100%" : "48%" }}
        >
          <WeatherCard {...item} />
        </View>
      ))}
    </ScrollView>
  );
};

export default WeatherDetail;

const styles = StyleSheet.create({
  header: {
    width: "100%",
    fontSize: 24,
    color: Colors.dark.text,
  },
  weatherContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
});
