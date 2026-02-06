import { useAuth } from "@/context/AuthContext";
import { Link, useRouter } from "expo-router";
import { Alert, Pressable, ScrollView, Text, View } from "react-native";

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
          <Text className="text-black">{user?.phone}</Text>
        </View>

        {/* User Section */}
        {isAuthenticated && user ? (
          <View className="bg-white rounded-2xl p-6 shadow-md mb-6">
            <View className="flex-row items-center mb-4">
              <View className="w-16 h-16 rounded-full bg-orange-500 items-center justify-center mr-4">
                <Text className="text-white text-2xl font-bold">
                  {user.name.charAt(0).toUpperCase()}
                </Text>
              </View>
              <View className="flex-1">
                <Text className="text-xl font-bold text-gray-800">
                  {user.name}
                </Text>
                <Text className="text-gray-600">{user.email}</Text>
              </View>
            </View>

            {/* User Info */}
            <View className="border-t border-gray-200 pt-4 mb-4">
              <View className="flex-row justify-between mb-2">
                <Text className="text-gray-600">Status</Text>
                <Text className="font-semibold text-green-600">✓ Login</Text>
              </View>
              {user.phone && (
                <View className="flex-row justify-between mb-2">
                  <Text className="text-gray-600">Telepon</Text>
                  <Text className="font-semibold text-gray-800">
                    {user.phone}
                  </Text>
                </View>
              )}
              <View className="flex-row justify-between">
                <Text className="text-gray-600">User ID</Text>
                <Text className="font-mono text-xs text-gray-500">
                  {user.id}
                </Text>
              </View>
            </View>

            {/* Logout Button */}
            <Pressable
              onPress={handleLogout}
              className="bg-red-500 active:bg-red-600 rounded-xl py-3"
            >
              <Text className="text-white text-center font-bold">Keluar</Text>
            </Pressable>
          </View>
        ) : (
          /* Not Logged In */
          <View className="bg-white rounded-2xl p-6 shadow-md mb-6">
            <View className="items-center mb-6">
              <View className="w-20 h-20 bg-orange-100 rounded-full items-center justify-center mb-4">
                <Text className="text-4xl">👤</Text>
              </View>
              <Text className="text-xl font-bold text-gray-800 mb-2">
                Belum Login
              </Text>
              <Text className="text-gray-600 text-center">
                Silakan login atau daftar untuk melanjutkan
              </Text>
            </View>

            <View className="gap-3">
              <Link href="/auth/login" asChild>
                <Pressable className="bg-orange-500 active:bg-orange-600 rounded-xl py-4">
                  <Text className="text-white text-center font-bold text-lg">
                    Masuk
                  </Text>
                </Pressable>
              </Link>
            </View>
          </View>
        )}

        {/* Features Section */}
        <View className="mb-6">
          <Text className="text-xl font-bold text-gray-800 mb-4">
            Fitur Auth System
          </Text>
          <View className="gap-3">
            <View className="bg-white rounded-xl p-4 shadow-sm">
              <Text className="font-semibold text-gray-800 mb-1">
                ✅ Secure Token Storage
              </Text>
              <Text className="text-gray-600 text-sm">
                Token disimpan dengan aman di expo-secure-store
              </Text>
            </View>
            <View className="bg-white rounded-xl p-4 shadow-sm">
              <Text className="font-semibold text-gray-800 mb-1">
                ✅ Auto Token Injection
              </Text>
              <Text className="text-gray-600 text-sm">
                Token otomatis ditambahkan ke semua API request
              </Text>
            </View>
            <View className="bg-white rounded-xl p-4 shadow-sm">
              <Text className="font-semibold text-gray-800 mb-1">
                ✅ Protected Routes
              </Text>
              <Text className="text-gray-600 text-sm">
                Route guard untuk halaman yang harus login
              </Text>
            </View>
            <View className="bg-white rounded-xl p-4 shadow-sm">
              <Text className="font-semibold text-gray-800 mb-1">
                ✅ Persistent Login
              </Text>
              <Text className="text-gray-600 text-sm">
                Login tetap tersimpan setelah app ditutup
              </Text>
            </View>
          </View>
        </View>

        {/* Documentation Link */}
        <View className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <Text className="font-semibold text-blue-800 mb-2">
            📚 Dokumentasi
          </Text>
          <Text className="text-blue-700 text-sm">
            Lihat docs/AUTH_GUIDE.md untuk panduan lengkap penggunaan sistem
            authentication
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}
