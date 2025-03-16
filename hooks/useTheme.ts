import { useColorScheme } from "react-native";
import Colors from "@/constants/Colors";

export function useTheme() {
  const colorScheme = useColorScheme() ?? "light";
  return {
    colors: Colors[colorScheme],
    colorScheme,
    // You can add more theme-related properties here
  };
}
