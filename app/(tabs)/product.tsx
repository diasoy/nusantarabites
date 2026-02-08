import { useDebounce } from "@/hooks/useDebounce";
import { useProducts } from "@/hooks/useProduct";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Image,
  Pressable,
  RefreshControl,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProductScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<
    string | undefined
  >();
  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  // Fetch products from API
  const { data, isLoading, isError, error, refetch, isRefetching } =
    useProducts({
      page: 1,
      size: 100,
      search: debouncedSearchQuery || undefined,
      category: selectedCategory ? Number(selectedCategory) : undefined,
    });

  const products = data?.data || [];
  const categories = ["Semua", "1", "2", "3"];

  return (
    <SafeAreaView className="flex-1 bg-gray-50" edges={["top"]}>
      <View className="flex-1 bg-gray-50">
        {/* Header */}
        <View className="bg-white px-6 py-4 border-b border-gray-200">
          <Text className="text-2xl font-bold text-gray-800 mb-4 text-center">
            Katalog Produk
          </Text>

          {/* Search Bar */}
          <View className="flex-row items-center bg-gray-100 rounded-xl px-4 py-3 mb-4">
            <Ionicons name="search" size={20} color="#9ca3af" />
            <TextInput
              className="flex-1 ml-2 text-gray-800"
              placeholder="Cari menu..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholderTextColor="#9ca3af"
            />
          </View>

          {/* Categories */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {categories.map((category) => {
              const categoryNames: Record<string, string> = {
                "1": "Frozen Food",
                "2": "Sambal",
                "3": "Rempah Rempah",
              };

              return (
                <Pressable
                  key={category}
                  onPress={() =>
                    setSelectedCategory(
                      category === "Semua" ? undefined : category,
                    )
                  }
                  className={`mr-3 px-4 py-2 rounded-full ${
                    (category === "Semua" && !selectedCategory) ||
                    selectedCategory === category
                      ? "bg-orange-500"
                      : "bg-gray-200"
                  }`}
                >
                  <Text
                    className={`font-semibold ${
                      (category === "Semua" && !selectedCategory) ||
                      selectedCategory === category
                        ? "text-white"
                        : "text-gray-700"
                    }`}
                  >
                    {category === "Semua" ? "Semua" : categoryNames[category]}
                  </Text>
                </Pressable>
              );
            })}
          </ScrollView>
        </View>

        {/* Menu List */}
        <ScrollView
          className="p-2"
          refreshControl={
            <RefreshControl refreshing={isRefetching} onRefresh={refetch} />
          }
        >
          {/* Loading State */}
          {isLoading && (
            <View className="flex-1 items-center justify-center py-20">
              <ActivityIndicator size="large" color="#f97316" />
              <Text className="text-gray-600 mt-4">Memuat produk...</Text>
            </View>
          )}

          {/* Error State */}
          {isError && (
            <View className="flex-1 items-center justify-center py-20">
              <Ionicons name="alert-circle" size={64} color="#ef4444" />
              <Text className="text-gray-800 font-bold text-lg mt-4">
                Gagal Memuat Data
              </Text>
              <Text className="text-gray-600 text-center mt-2 px-8">
                {error?.message || "Terjadi kesalahan saat memuat produk"}
              </Text>
              <Pressable
                onPress={() => refetch()}
                className="bg-orange-500 rounded-xl px-6 py-3 mt-4"
              >
                <Text className="text-white font-semibold">Coba Lagi</Text>
              </Pressable>
            </View>
          )}

          {/* Empty State */}
          {!isLoading && !isError && products.length === 0 && (
            <View className="flex-1 items-center justify-center py-20">
              <Ionicons name="search" size={64} color="#9ca3af" />
              <Text className="text-gray-800 font-bold text-lg mt-4">
                Produk Tidak Ditemukan
              </Text>
              <Text className="text-gray-600 text-center mt-2 px-8">
                Tidak ada produk yang sesuai dengan pencarian Anda
              </Text>
            </View>
          )}

          {/* Products Grid */}
          {!isLoading && !isError && products.length > 0 && (
            <View className="flex-row flex-wrap">
              {products.map((item) => (
                <Pressable
                  key={item.id}
                  onPress={() => {
                    router.push(`/product/${item.id.toString()}` as any);
                  }}
                  className="w-1/2 px-2 mb-4"
                >
                  <View className="bg-white rounded-2xl shadow-md">
                    <View>
                      <Image
                        source={{
                          uri:
                            item.image_url ||
                            "https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=500",
                        }}
                        style={{
                          width: "100%",
                          height: 120,
                          borderTopLeftRadius: 16,
                          borderTopRightRadius: 16,
                        }}
                        resizeMode="cover"
                      />
                      {!item.is_active && (
                        <View className="absolute top-2 left-2 bg-red-500 rounded-lg px-2 py-1">
                          <Text className="text-white text-xs font-bold">
                            Tidak Aktif
                          </Text>
                        </View>
                      )}
                      {item.price_before_discount && (
                        <View className="absolute top-2 right-2 bg-orange-500 rounded-lg px-2 py-1">
                          <Text className="text-white text-xs font-bold">
                            Diskon
                          </Text>
                        </View>
                      )}
                      <Pressable className="absolute bottom-2 right-2 bg-white rounded-xl p-2 shadow-md active:bg-gray-100">
                        <Ionicons name="add" size={28} color="#f97316" />
                      </Pressable>
                    </View>
                    <View className="px-4 py-2">
                      <Text
                        className="text-sm font-semibold text-gray-800"
                        numberOfLines={2}
                      >
                        {item.name}
                      </Text>
                      <Text className="text-xs text-gray-500 mt-1">
                        {item.category_name}
                      </Text>
                      {item.price_before_discount && (
                        <Text className="text-xs text-gray-400 line-through">
                          Rp{" "}
                          {item.price_before_discount.toLocaleString("id-ID")}
                        </Text>
                      )}
                      <Text className="text-orange-600 font-bold">
                        Rp {item.price.toLocaleString("id-ID")}
                      </Text>
                    </View>
                  </View>
                </Pressable>
              ))}
            </View>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
