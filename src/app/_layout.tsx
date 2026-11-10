import { Stack } from "expo-router";
import { ProductProvider } from "../context/ProductContext";

export default function RootLayout() {
  return (
    <ProductProvider>
      <Stack>
        <Stack.Screen name="index" options={{ title: "Məhsullar" }} />
        <Stack.Screen
          name="product-details"
          options={{ title: "Məhsul Detalları" }}
        />
        <Stack.Screen
          name="add-product"
          options={{ title: "Yeni Məhsul Əlavə Et" }}
        />
      </Stack>
    </ProductProvider>
  );
}
