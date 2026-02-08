import { useProductDetail } from "@/hooks/useProduct";
import { Ionicons } from "@expo/vector-icons";
import { Stack, useLocalSearchParams } from "expo-router";
import {
    ActivityIndicator,
    Image,
    Pressable,
    ScrollView,
    Text,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data: product, isLoading, isError } = useProductDetail(id);

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top"]}>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />

      {isLoading && (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#f97316" />
        </View>
      )}

      {isError && (
        <View className="flex-1 items-center justify-center">
          <Text className="text-red-500">Gagal memuat detail produk</Text>
        </View>
      )}

      {product && (
        <>
          <ScrollView
            className="flex-1"
            contentContainerStyle={{ paddingBottom: 100 }}
          >
            {/* Image */}
            <Image
              source={{ uri: product.image_url }}
              style={{ width: "100%", height: 300 }}
              resizeMode="cover"
            />

            {/* Content */}
            <View className="p-6">
              <Text className="text-2xl font-bold text-gray-800 mb-2">
                {product.name}
              </Text>

              <Text className="text-gray-600 mb-4">
                {product.category_name}
              </Text>

              {product.price_before_discount && (
                <Text className="text-gray-400 line-through mb-1">
                  Rp {product.price_before_discount.toLocaleString("id-ID")}
                </Text>
              )}

              <Text className="text-3xl font-bold text-orange-600 mb-6">
                Rp {product.price.toLocaleString("id-ID")}
              </Text>

              <Text className="text-gray-700 leading-6">
                {product.description || "Tidak ada deskripsi"}
              </Text>
            </View>
          </ScrollView>

          {/* Fixed Bottom Button */}
          <View className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-50 px-6 py-4 shadow-lg">
            <Pressable className="bg-orange-500 rounded-xl py-4 flex-row items-center justify-center active:bg-orange-600">
              <Ionicons name="cart" size={24} color="white" />
              <Text className="text-white text-center font-bold text-lg ml-2">
                Tambah ke Keranjang
              </Text>
            </Pressable>
          </View>
        </>
      )}
    </SafeAreaView>
  );
}
