import React, { useState } from "react";
import { SafeAreaView, View, Text, TextInput, FlatList, TouchableOpacity, ActivityIndicator, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { searchUsers } from "../../services/user";
import { Ionicons } from "@expo/vector-icons"; // Importing Ionicons for search icon

const SearchPage = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSearch = async () => {
    if (!query.trim()) {
      Alert.alert("Error", "Please enter a search query");
      return;
    }

    setLoading(true);
    try {
      const users = await searchUsers(query);
      setResults(users);
    } catch (error) {
      Alert.alert("Error", "Failed to fetch search results");
    } finally {
      setLoading(false);
    }
  };

  const handleUserSelect = (user) => {
    router.push(`/${user.id}`);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.resultItem} onPress={() => handleUserSelect(item)}>
      <Text style={styles.userName}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#4CAF50" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search by name or email"
          value={query}
          onChangeText={setQuery}
          onSubmitEditing={handleSearch}
          returnKeyType="search"
        />
      </View>
      {loading ? (
        <ActivityIndicator size="large" color="#4C8EF7" style={styles.loader} />
      ) : (
        <FlatList
          data={results}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          ListEmptyComponent={!loading && <Text style={styles.emptyText}>Search by name</Text>}
          contentContainerStyle={styles.resultsContainer}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 24,
    backgroundColor: "#F9FAFB",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    borderColor: "#4CAF50",
    borderWidth: 1,
    borderRadius: 25,
    paddingHorizontal: 10,
    paddingVertical: 5,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 4,
    height: 50,
    margin:20,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  loader: {
    marginTop: 20,
  },
  resultsContainer: {
    paddingBottom: 20,
  },
  resultItem: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 2,
    flexDirection: "row",
    alignItems: "center",
  },
  userName: {
    fontSize: 18,
    fontWeight: "500",
    color: "#333",
  },
  userEmail: {
    fontSize: 14,
    color: "#888",
    marginTop: 2,
  },
  emptyText: {
    textAlign: "center",
    fontSize: 16,
    color: "#888",
    marginTop: 20,
  },
});

export default SearchPage;
