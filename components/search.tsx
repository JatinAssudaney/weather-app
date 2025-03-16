import {
  StyleSheet,
  TextInput,
  View,
  Text,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useState, useCallback } from "react";
import Colors from "@/constants/Colors";
import { debounce } from "lodash";
import { Location } from "@/types";
import { searchLocation } from "@/api";
import Icon from "react-native-vector-icons/MaterialIcons";

const MIN_SEARCH_LIMIT = 3;

interface LocationSearchProps {
  onPress: (item: Location) => void;
}

const LocationSearch = ({ onPress }: LocationSearchProps) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<Location[]>([]);

  const fetchSearchResults = async (query: string) => {
    if (query.length < MIN_SEARCH_LIMIT) {
      setSearchResults([]);
      return;
    }
    const data = await searchLocation(query);
    setSearchResults(data);
  };

  const debouncedFetchSearchResults = useCallback(
    debounce((query: string) => fetchSearchResults(query), 300),
    []
  );

  const handleSearchChange = (text: string) => {
    setSearchQuery(text);
    debouncedFetchSearchResults(text);
  };

  const handlePress = (item: Location) => {
    onPress(item);
    setSearchQuery("");
    setSearchResults([]);
  };

  const renderItem = ({ item }: { item: Location }) => {
    return (
      <TouchableOpacity
        onPress={() => handlePress(item)}
        style={styles.resultItem}
      >
        <Text style={styles.resultItemText}>
          {`${item.name}, ${item.region}, ${item.country}`}
        </Text>
      </TouchableOpacity>
    );
  };

  const textInputStyles = searchResults.length
    ? [
        styles.searchBar,
        {
          borderBottomColor: Colors.dark.gradientEnd,
          borderEndStartRadius: 0,
          borderEndEndRadius: 0,
        },
      ]
    : [styles.searchBar];

  return (
    <View style={styles.container}>
      <View style={styles.searchBarContainer}>
        <Icon name="search" size={16} style={styles.icon} />
        <TextInput
          style={textInputStyles}
          value={searchQuery}
          onChangeText={handleSearchChange}
          placeholderTextColor={Colors.dark.secondaryText}
          placeholder="Search for a location"
          editable={true}
          selectTextOnFocus={true}
        />
      </View>

      {searchResults.length > 0 && (
        <FlatList
          style={styles.searchResults}
          data={searchResults}
          keyExtractor={(item: Location) => item.id.toString()}
          renderItem={renderItem}
          keyboardShouldPersistTaps="handled"
        />
      )}
    </View>
  );
};

export default LocationSearch;

const styles = StyleSheet.create({
  container: {
    zIndex: 1,
    width: "100%",
  },
  searchBarContainer: {
    width: "100%",
    flexDirection: "row",
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#fff",
    alignItems: "center",
    paddingHorizontal: 8,
    gap: 4,
    height: 36,
  },
  searchBar: {
    opacity: 0.5,
    color: Colors.dark.secondaryText,
    borderColor: "transparent",
  },
  searchResults: {
    position: "absolute",
    top: 36,
    width: "100%",
    borderEndStartRadius: 8,
    borderEndEndRadius: 8,
  },
  resultItem: {
    backgroundColor: Colors.dark.gradientEnd,
    padding: 8,
  },
  resultItemText: {
    color: Colors.dark.text,
  },
  icon: {
    color: Colors.dark.secondaryText,
    opacity: 0.5,
  },
});
