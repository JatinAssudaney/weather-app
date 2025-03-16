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
import axios from "axios";
import { Location } from "@/types";
import { SEARCH_LOCATION } from "@/constants/server";

const MIN_SEARCH_LIMIT = 3;

const LocationSearch = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<Location[]>([]);

  const fetchSearchResults = async (query: string) => {
    if (query.length < MIN_SEARCH_LIMIT) {
      setSearchResults([]);
      return;
    }
    try {
      const { data }: { data: Location[] } = await axios.get(
        `${SEARCH_LOCATION}?search-term=${query}`
      );
      setSearchResults(data);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  const debouncedFetchSearchResults = useCallback(
    debounce((query: string) => fetchSearchResults(query), 300),
    []
  );

  const handleSearchChange = (text: string) => {
    setSearchQuery(text);
    debouncedFetchSearchResults(text);
  };

  const handlePress = (item: any) => {
    setSearchQuery(item.name);
    setSearchResults([]); // Hide results after selection
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
      <TextInput
        style={textInputStyles}
        value={searchQuery}
        onChangeText={handleSearchChange}
        placeholderTextColor={Colors.dark.secondaryText}
        placeholder="Search for a location"
        editable={true}
        selectTextOnFocus={true}
      />

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
  searchBar: {
    height: 36,
    borderColor: "#fff",
    opacity: 0.5,
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: 8,
    color: Colors.dark.secondaryText,
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
});
