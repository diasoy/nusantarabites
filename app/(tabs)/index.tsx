import { useAuth } from "@/context/AuthContext";
import { useRouter } from "expo-router";
import { Alert, Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const router = useRouter();
  const { user, isAuthenticated, logout } = useAuth();

  const handleLogout = async () => {
    Alert.alert("Konfirmasi Logout", "Apakah Anda yakin ingin keluar?", [
      { text: "Batal", style: "cancel" },
      {
        text: "Keluar",
        style: "destructive",
        onPress: async () => {
          try {
            await logout();
            router.replace("/auth/login");
          } catch (error) {
            console.error("Logout error:", error);
          }
        },
      },
    ]);
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50" edges={["top"]}>
      <ScrollView className="flex-1 bg-gray-50">
        <View className="flex-1 p-6">
          {/* Header */}
          <View className="mb-8">
            <Text className="text-3xl font-bold text-gray-800 mb-2">
              🍜 NusantaraBites
            </Text>
            <Text className="text-gray-600">
              Cita rasa nusantara di genggaman Anda
            </Text>
            {user && (
              <Text className="text-gray-800 mt-2 font-semibold">
                Halo, {user.name}!
              </Text>
            )}
          </View>

          {/* Quick Stats */}
          <View className="flex-row gap-4 mb-6">
            <View className="flex-1 bg-orange-500 rounded-2xl p-4">
              <Text className="text-white text-3xl font-bold mb-1">24</Text>
              <Text className="text-white text-sm">Pesanan Hari Ini</Text>
            </View>
            <View className="flex-1 bg-green-500 rounded-2xl p-4">
              <Text className="text-white text-3xl font-bold mb-1">
                Rp 2.4jt
              </Text>
              <Text className="text-white text-sm">Total Penjualan</Text>
            </View>
          </View>

          {/* Quick Actions */}
          <View className="mb-6">
            <Text className="text-xl font-bold text-gray-800 mb-4">
              Aksi Cepat
            </Text>
            <View className="flex-row gap-4">
              <Pressable className="flex-1 bg-white rounded-2xl p-6 shadow-md items-center active:bg-gray-50">
                <Text className="text-4xl mb-2">🍽️</Text>
                <Text className="text-gray-800 font-semibold text-center">
                  Pesanan Baru
                </Text>
              </Pressable>
              <Pressable className="flex-1 bg-white rounded-2xl p-6 shadow-md items-center active:bg-gray-50">
                <Text className="text-4xl mb-2">📊</Text>
                <Text className="text-gray-800 font-semibold text-center">
                  Laporan
                </Text>
              </Pressable>
            </View>
          </View>

          {/* Menu Populer */}
          <View className="mb-6">
            <Text className="text-xl font-bold text-gray-800 mb-4">
              Menu Populer
            </Text>
            <View className="bg-white rounded-2xl p-4 shadow-md mb-3">
              <View className="flex-row justify-between items-center">
                <View>
                  <Text className="text-lg font-semibold text-gray-800">
                    Nasi Goreng Spesial
                  </Text>
                  <Text className="text-gray-600">Rp 25.000</Text>
                </View>
                <Text className="text-2xl">🍚</Text>
              </View>
            </View>
            <View className="bg-white rounded-2xl p-4 shadow-md mb-3">
              <View className="flex-row justify-between items-center">
                <View>
                  <Text className="text-lg font-semibold text-gray-800">
                    Soto Ayam
                  </Text>
                  <Text className="text-gray-600">Rp 20.000</Text>
                </View>
                <Text className="text-2xl">🍜</Text>
              </View>
            </View>
          </View>

          {/* Logout Button */}
          {isAuthenticated && (
            <Pressable
              onPress={handleLogout}
              className="bg-red-500 rounded-xl p-4 items-center active:bg-red-600"
            >
              <Text className="text-white font-bold text-lg">Keluar</Text>
            </Pressable>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
