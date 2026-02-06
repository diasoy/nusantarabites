import { useAuth } from "@/context/AuthContext";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Alert, Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProfileScreen() {
  const router = useRouter();
  const { user, logout } = useAuth();

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
        <View className="bg-orange-500 px-6 py-4">
          <View className="flex-row items-center">
            <View className="w-20 h-20 rounded-full bg-white items-center justify-center mr-4">
              <Text className="text-orange-500 text-3xl font-bold">
                {user?.name.charAt(0).toUpperCase()}
              </Text>
            </View>
            <View className="flex-1">
              <Text className="text-white text-xl font-bold">{user?.name}</Text>
              <Text className="text-orange-100">{user?.phone}</Text>
            </View>
          </View>
        </View>

        {/* Profile Menu */}
        <View className="px-6 py-4">
          {/* Account Section */}
          <View className="bg-white rounded-2xl shadow-md mb-4 overflow-hidden">
            <Pressable className="flex-row items-center p-4 border-b border-gray-100 active:bg-gray-50">
              <View className="w-10 h-10 rounded-full bg-orange-100 items-center justify-center mr-4">
                <Ionicons name="person-outline" size={20} color="#f97316" />
              </View>
              <View className="flex-1">
                <Text className="text-gray-800 font-semibold">Edit Profil</Text>
                <Text className="text-gray-500 text-sm">
                  Ubah informasi akun
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
            </Pressable>

            <Pressable className="flex-row items-center p-4 active:bg-gray-50">
              <View className="w-10 h-10 rounded-full bg-orange-100 items-center justify-center mr-4">
                <Ionicons
                  name="lock-closed-outline"
                  size={20}
                  color="#f97316"
                />
              </View>
              <View className="flex-1">
                <Text className="text-gray-800 font-semibold">
                  Ubah Password
                </Text>
                <Text className="text-gray-500 text-sm">Keamanan akun</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
            </Pressable>
          </View>

          {/* Business Section */}
          <View className="bg-white rounded-2xl shadow-md mb-4 overflow-hidden">
            <Pressable className="flex-row items-center p-4 border-b border-gray-100 active:bg-gray-50">
              <View className="w-10 h-10 rounded-full bg-green-100 items-center justify-center mr-4">
                <Ionicons name="storefront-outline" size={20} color="#22c55e" />
              </View>
              <View className="flex-1">
                <Text className="text-gray-800 font-semibold">
                  Informasi Toko
                </Text>
                <Text className="text-gray-500 text-sm">
                  Detail bisnis Anda
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
            </Pressable>

            <Pressable className="flex-row items-center p-4 active:bg-gray-50">
              <View className="w-10 h-10 rounded-full bg-green-100 items-center justify-center mr-4">
                <Ionicons
                  name="stats-chart-outline"
                  size={20}
                  color="#22c55e"
                />
              </View>
              <View className="flex-1">
                <Text className="text-gray-800 font-semibold">Laporan</Text>
                <Text className="text-gray-500 text-sm">
                  Statistik penjualan
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
            </Pressable>
          </View>

          {/* Settings Section */}
          <View className="bg-white rounded-2xl shadow-md mb-4 overflow-hidden">
            <Pressable className="flex-row items-center p-4 border-b border-gray-100 active:bg-gray-50">
              <View className="w-10 h-10 rounded-full bg-blue-100 items-center justify-center mr-4">
                <Ionicons
                  name="notifications-outline"
                  size={20}
                  color="#3b82f6"
                />
              </View>
              <View className="flex-1">
                <Text className="text-gray-800 font-semibold">Notifikasi</Text>
                <Text className="text-gray-500 text-sm">
                  Pengaturan notifikasi
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
            </Pressable>

            <Pressable className="flex-row items-center p-4 active:bg-gray-50">
              <View className="w-10 h-10 rounded-full bg-blue-100 items-center justify-center mr-4">
                <Ionicons
                  name="help-circle-outline"
                  size={20}
                  color="#3b82f6"
                />
              </View>
              <View className="flex-1">
                <Text className="text-gray-800 font-semibold">Bantuan</Text>
                <Text className="text-gray-500 text-sm">
                  Pusat bantuan & FAQ
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
            </Pressable>
          </View>

          {/* Logout Button */}
          <Pressable
            onPress={handleLogout}
            className="bg-red-500 rounded-xl p-4 flex-row items-center justify-center active:bg-red-600"
          >
            <Ionicons name="log-out-outline" size={24} color="white" />
            <Text className="text-white font-bold text-lg ml-2">Keluar</Text>
          </Pressable>

          {/* App Version */}
          <Text className="text-center text-gray-400 text-sm mt-6">
            Version 1.0.0
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
