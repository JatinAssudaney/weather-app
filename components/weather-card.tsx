import { View, Text, Dimensions, StyleSheet, ViewStyle } from "react-native";
import React from "react";
import Colors from "@/constants/Colors";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export interface WeatherCardProps {
  icon: string;
  title: string;
  value: string;
  unit?: string;
  fullWidth?: boolean;
  children?: React.ReactNode;
}

const WeatherCard = (props: WeatherCardProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Icon name={props.icon} size={16} style={styles.headerText} />
        <Text style={styles.headerText}>{props.title}</Text>
        {props.children}
      </View>
      <View style={styles.body}>
        <Text style={styles.value}>{props.value}</Text>
        {props.unit ? <Text style={styles.unit}>{props.unit}</Text> : <></>}
      </View>
    </View>
  );
};

export default WeatherCard;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginVertical: 8,
    height: Dimensions.get("window").width / 2 - 40,
    backgroundColor: Colors.dark.backgroundColor,
    borderRadius: 8,
    paddingVertical: 16,
    paddingHorizontal: 12,
    gap: 12,
  },
  header: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: 4,
  },
  headerText: {
    color: Colors.dark.secondaryText,
    opacity: 0.4,
    textTransform: "uppercase",
  },
  body: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: 8,
  },
  value: {
    color: Colors.dark.text,
    fontSize: 36,
    fontWeight: "bold",
    marginTop: 8,
  },
  unit: {
    color: Colors.dark.text,
    fontSize: 24,
    fontWeight: "bold",
  },
});
