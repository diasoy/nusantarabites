import { useAuth } from "@/context/AuthContext";
import { Redirect } from "expo-router";
import { ReactNode } from "react";
import { ActivityIndicator, Text, View } from "react-native";

interface ProtectedRouteProps {
  children: ReactNode;
}

/**
 * Protected Route Component
 *
 * Wraps child components and ensures user is authenticated
 * before rendering. Redirects to login if not authenticated.
 *
 * Usage:
 * ```tsx
 * export default function SomePage() {
 *   return (
 *     <ProtectedRoute>
 *       <View>
 *         <Text>Protected Content</Text>
 *       </View>
 *     </ProtectedRoute>
 *   );
 * }
 * ```
 */
export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading } = useAuth();

  // Show loading while checking auth state
  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#F97316" />
        <Text className="text-gray-600 mt-4">Memuat...</Text>
      </View>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Redirect href="/auth/login" />;
  }

  // Render children if authenticated
  return <>{children}</>;
}
