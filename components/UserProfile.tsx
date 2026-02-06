import { useAuth } from "@/context/AuthContext";
import { router } from "expo-router";
import { Alert, Image, Text, TouchableOpacity, View } from "react-native";

/**
 * User Profile Component
 *
 * Displays user info and logout button
 * Example of how to use auth state throughout the app
 */
export function UserProfile() {
  const { user, logout, isLoading } = useAuth();

  const handleLogout = async () => {
    Alert.alert("Konfirmasi Logout", "Apakah Anda yakin ingin keluar?", [
      {
        text: "Batal",
        style: "cancel",
      },
      {
        text: "Keluar",
        style: "destructive",
        onPress: async () => {
          try {
            await logout();
            router.replace("/auth/login");
          } catch (error) {
            console.error("Logout error:", error);
            Alert.alert("Error", "Gagal logout. Silakan coba lagi.");
          }
        },
      },
    ]);
  };

  if (!user) {
    return (
      <View className="bg-white rounded-2xl p-4 shadow-md">
        <Text className="text-gray-600">User tidak ditemukan</Text>
      </View>
    );
  }

  return (
    <View className="bg-white rounded-2xl p-6 shadow-lg">
      {/* User Avatar */}
      <View className="items-center mb-4">
        {user.photo_url ? (
          <Image
            source={{ uri: user.photo_url }}
            className="w-24 h-24 rounded-full"
          />
        ) : (
          <View className="w-24 h-24 rounded-full bg-orange-500 items-center justify-center">
            <Text className="text-white text-3xl font-bold">
              {user.name.charAt(0).toUpperCase()}
            </Text>
          </View>
        )}
      </View>

      {/* User Info */}
      <View className="mb-6">
        <Text className="text-2xl font-bold text-gray-800 text-center mb-2">
          {user.name}
        </Text>
        <Text className="text-gray-600 text-center">{user.email}</Text>
        {user.phone && (
          <Text className="text-gray-600 text-center mt-1">{user.phone}</Text>
        )}
      </View>

      {/* Logout Button */}
      <TouchableOpacity
        onPress={handleLogout}
        disabled={isLoading}
        className={`rounded-xl py-3 ${
          isLoading ? "bg-red-300" : "bg-red-500 active:bg-red-600"
        }`}
      >
        <Text className="text-white text-center font-bold">
          {isLoading ? "Memproses..." : "Keluar"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
