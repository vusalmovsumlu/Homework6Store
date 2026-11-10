import React, { useState, useContext } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from "react-native";
import { ProductContext } from "../context/ProductContext";
import { useRouter } from "expo-router";

export default function AddProductScreen() {
  const context = useContext(ProductContext);
  const router = useRouter();

  if (!context) return null;
  const { addProduct } = context;

  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const handleAdd = () => {
    if (!name.trim() || !price.trim()) {
      Alert.alert("Diqqət", "Zəhmət olmasa ad və qiymət daxil edin!");
      return;
    }

    addProduct({
      name,
      price,
      description,
      imageUrl: "https://via.placeholder.com/150",
    });

    router.back(); 
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.inner}>
        <Text style={styles.label}>Məhsulun Adı</Text>
        <TextInput
          style={styles.input}
          placeholder="Məs: iPhone 15"
          value={name}
          onChangeText={setName}
        />

        <Text style={styles.label}>Qiymət</Text>
        <TextInput
          style={styles.input}
          placeholder="Məs: 2000 AZN"
          value={price}
          onChangeText={setPrice}
        />

        <Text style={styles.label}>Təsvir</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Məhsul haqqında qısa məlumat..."
          value={description}
          onChangeText={setDescription}
          multiline
        />

        <TouchableOpacity
          style={[
            styles.addButton,
            {
              backgroundColor: Platform.select({
                ios: "#007AFF",
                android: "#6200ee",
                default: "blue",
              }),
            },
          ]}
          onPress={handleAdd}
        >
          <Text style={styles.addButtonText}>Əlavə Et</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  inner: { padding: 20 },
  label: { fontSize: 14, fontWeight: "bold", color: "#333", marginBottom: 6 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 16,
    backgroundColor: "#fafafa",
  },
  textArea: { height: 100, textAlignVertical: "top" },
  addButton: {
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  addButtonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});
