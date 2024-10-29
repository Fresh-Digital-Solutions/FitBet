import React, { useState } from "react";
import { SafeAreaView,View, Text, TextInput, FlatList, TouchableOpacity, Alert, StyleSheet } from "react-native";
import { useRouter, Redirect } from "expo-router"; // Import useRouter hook
import { searchUsers } from "../../services/user";

const SearchPage = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter(); // Initialize router

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
    // Navigate to the dynamic profile page with the user ID
    router.push(`/${user.id}`);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.resultItem} onPress={() => handleUserSelect(item)}>
      <Text style={styles.userName}>{item.name}</Text>
      <Text style={styles.userEmail}>{item.email}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Search for Users</Text>
      
      <TextInput
        style={styles.searchInput}
        placeholder="Search by name or email"
        value={query}
        onChangeText={setQuery}
        onSubmitEditing={handleSearch}
        returnKeyType="search"
      />

      <TouchableOpacity style={styles.searchButton} onPress={handleSearch} disabled={loading}>
        <Text style={styles.searchButtonText}>{loading ? "Searching..." : "Search"}</Text>
      </TouchableOpacity>

      <FlatList
        data={results}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        ListEmptyComponent={<Text style={styles.noResultsText}>No results found</Text>}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#F3F4F6",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
    color: "#333",
  },
  searchInput: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 12,
  },
  searchButton: {
    backgroundColor: "#87DF4F",
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
    marginBottom: 20,
  },
  searchButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  resultItem: {
    backgroundColor: "#FFF",
    padding: 16,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  userName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  userEmail: {
    fontSize: 14,
    color: "#666",
  },
  noResultsText: {
    textAlign: "center",
    color: "#666",
    fontSize: 16,
    marginTop: 20,
  },
});

export default SearchPage;
