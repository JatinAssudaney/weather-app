import { Stack } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { Dimensions, SafeAreaView, StyleSheet, View } from "react-native";
import { useTheme } from "../hooks/useTheme";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
  const { colors } = useTheme();

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <LinearGradient
          colors={[colors.gradientStart, colors.gradientEnd]}
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
          }}
        />
        <SafeAreaView style={styles.safeArea}>
          <Stack
            screenOptions={{
              headerShown: true,
              headerTransparent: true,
              headerTitle: "",
              contentStyle: {
                backgroundColor: "transparent",
              },
              headerTintColor: colors.text,
            }}
          ></Stack>
        </SafeAreaView>
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
});
