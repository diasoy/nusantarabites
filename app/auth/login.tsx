import { useAuth } from "@/context/AuthContext";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const LoginPage = () => {
  const router = useRouter();
  const { login, isLoading } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secureText, setSecureText] = useState(true);
  const [errors, setErrors] = useState({ email: "", password: "" });

  const validateInputs = () => {
    let valid = true;
    const newErrors = { email: "", password: "" };

    // Validate email
    if (!email.trim()) {
      newErrors.email = "Email harus diisi";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Format email tidak valid";
      valid = false;
    }

    // Validate password
    if (!password) {
      newErrors.password = "Password harus diisi";
      valid = false;
    } else if (password.length < 6) {
      newErrors.password = "Password minimal 6 karakter";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleLogin = async () => {
    // Reset errors
    setErrors({ email: "", password: "" });

    // Validate inputs
    if (!validateInputs()) {
      return;
    }

    try {
      // Call login from AuthContext
      await login({
        identifier: email.trim(),
        password: password,
        role_id: "cashier", // Adjust based on your API requirements
      });

      // Navigate to home after successful login
      router.replace("/");
    } catch (error: any) {
      console.error("Login error:", error);

      // Show error message
      Alert.alert(
        "Login Gagal",
        error?.message || "Terjadi kesalahan. Silakan coba lagi.",
        [{ text: "OK" }],
      );
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1"
    >
      <ScrollView
        contentContainerClassName="flex-grow"
        className="flex-1 bg-gradient-to-br from-orange-50 to-amber-50"
        style={{ backgroundColor: "#FFF7ED" }}
      >
        <View className="flex-1 justify-center px-6 py-12">
          {/* Logo/Brand Section */}
          <View className="items-center mb-12">
            <View className="w-20 h-20 bg-orange-500 rounded-3xl items-center justify-center mb-4 shadow-lg">
              <Text className="text-4xl">🍜</Text>
            </View>
            <Text className="text-3xl font-bold text-gray-800 mb-2">
              NusantaraBites
            </Text>
            <Text className="text-gray-500 text-base">
              Cita rasa nusantara di genggaman
            </Text>
          </View>
          {/* Login Form Card */}
          <View className="bg-white rounded-3xl shadow-2xl p-8 mb-6">
            <Text className="text-2xl font-bold text-gray-800 mb-6">Masuk</Text>

            {/* Email Input */}
            <View className="mb-5">
              <Text className="text-gray-700 text-sm font-semibold mb-2">
                Email
              </Text>
              <View
                className={`flex-row items-center bg-gray-50 rounded-xl px-4 py-3 border ${
                  errors.email ? "border-red-500" : "border-gray-200"
                }`}
              >
                <Text className="text-lg mr-3">📧</Text>
                <TextInput
                  className="flex-1 text-gray-800 text-base"
                  placeholder="nama@email.com"
                  placeholderTextColor="#9CA3AF"
                  value={email}
                  onChangeText={(text) => {
                    setEmail(text);
                    if (errors.email) setErrors({ ...errors, email: "" });
                  }}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoComplete="email"
                  editable={!isLoading}
                />
              </View>
              {errors.email ? (
                <Text className="text-red-500 text-xs mt-1">
                  {errors.email}
                </Text>
              ) : null}
            </View>

            {/* Password Input */}
            <View className="mb-6">
              <Text className="text-gray-700 text-sm font-semibold mb-2">
                Kata Sandi
              </Text>
              <View
                className={`flex-row items-center bg-gray-50 rounded-xl px-4 py-3 border ${
                  errors.password ? "border-red-500" : "border-gray-200"
                }`}
              >
                <Text className="text-lg mr-3">🔒</Text>
                <TextInput
                  className="flex-1 text-gray-800 text-base"
                  placeholder="Masukkan kata sandi"
                  placeholderTextColor="#9CA3AF"
                  value={password}
                  onChangeText={(text) => {
                    setPassword(text);
                    if (errors.password) setErrors({ ...errors, password: "" });
                  }}
                  secureTextEntry={secureText}
                  autoCapitalize="none"
                  editable={!isLoading}
                />
                <TouchableOpacity
                  onPress={() => setSecureText(!secureText)}
                  className="ml-2"
                  disabled={isLoading}
                >
                  <Text className="text-lg">{secureText ? "👁️" : "🙈"}</Text>
                </TouchableOpacity>
              </View>
              {errors.password ? (
                <Text className="text-red-500 text-xs mt-1">
                  {errors.password}
                </Text>
              ) : null}
            </View>

            {/* Forgot Password Link */}
            <TouchableOpacity className="mb-6 self-end" disabled={isLoading}>
              <Text className="text-orange-600 font-semibold text-sm">
                Lupa kata sandi?
              </Text>
            </TouchableOpacity>

            {/* Login Button */}
            <TouchableOpacity
              onPress={handleLogin}
              disabled={isLoading}
              className={`rounded-xl py-4 shadow-lg ${
                isLoading
                  ? "bg-orange-300"
                  : "bg-orange-500 active:bg-orange-600"
              }`}
              style={{
                shadowColor: "#F97316",
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3,
                shadowRadius: 8,
                elevation: 5,
              }}
            >
              {isLoading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text className="text-white text-center font-bold text-lg">
                  Masuk
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LoginPage;
