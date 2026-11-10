import React, { useState, useContext } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { ProductContext } from "../context/ProductContext";
import { Product } from "../types/types";
import { useLocalSearchParams, useRouter } from "expo-router";

export default function ProductDetailsScreen() {
  const { product: productParam } = useLocalSearchParams();
  const product: Product =
    typeof productParam === "string" ? JSON.parse(productParam) : productParam;

  const context = useContext(ProductContext);
  const router = useRouter();

  if (!context) return null;
  const { updateProduct } = context;

  const [name, setName] = useState<string>(product.name);
  const [price, setPrice] = useState<string>(product.price);
  const [description, setDescription] = useState<string>(product.description);

  const handleSave = () => {
    updateProduct({
      ...product,
      name,
      price,
      description,
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
        <TextInput style={styles.input} value={name} onChangeText={setName} />

        <Text style={styles.label}>Qiymət</Text>
        <TextInput style={styles.input} value={price} onChangeText={setPrice} />

        <Text style={styles.label}>Təsvir</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={description}
          onChangeText={setDescription}
          multiline
        />

        <TouchableOpacity
          style={[
            styles.saveButton,
            {
              backgroundColor: Platform.select({
                ios: "#34C759",
                android: "#4CAF50",
                default: "green",
              }),
            },
          ]}
          onPress={handleSave}
        >
          <Text style={styles.saveButtonText}>Yadda saxla</Text>
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
  saveButton: {
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  saveButtonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});
