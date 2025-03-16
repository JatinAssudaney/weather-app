import CardList from "@/components/card-list";
import { StyleSheet, View } from "react-native";

export default function Index() {
  return (
    <View style={styles.app}>
      <CardList />
    </View>
  );
}

const styles = StyleSheet.create({
  app: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
