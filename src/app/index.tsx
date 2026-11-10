import React, { useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  Platform,
} from "react-native";
import { ProductContext } from "../context/ProductContext";
import { Product } from "../types/types";
import { useRouter } from "expo-router";

export default function HomeScreen() {
  const context = useContext(ProductContext);
  const router = useRouter();

  if (!context) return null;
  const { products } = context;

  const renderItem = ({ item }: { item: Product }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        router.push({
          pathname: "/ProductDetailsScreen",
          params: { product: JSON.stringify(item) },
        })
      }
    >
      <Image source={{ uri: item.imageUrl }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.price}>{item.price}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />

      <TouchableOpacity
        style={[
          styles.addButton,
          {
            backgroundColor: Platform.select({
              ios: "#007AFF",
              android: "#6200ee",
              default: "gray",
            }),
          },
        ]}
        onPress={() => router.push("/AddProductScreen")}
      >
        <Text style={styles.addButtonText}>+ Yeni Məhsul Əlavə Et</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5" },
  list: { padding: 16 },
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    alignItems: "center",
    elevation: 3,
  },
  image: { width: 60, height: 60, borderRadius: 6, backgroundColor: "#ddd" },
  info: { marginLeft: 12, flex: 1 },
  name: { fontSize: 16, fontWeight: "bold", color: "#333" },
  price: { fontSize: 14, color: "#666", marginTop: 4 },
  addButton: {
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
    margin: 16,
    borderRadius: 8,
  },
  addButtonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});
