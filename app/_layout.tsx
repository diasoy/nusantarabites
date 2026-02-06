import { AuthProvider } from "@/context/AuthContext";
import { queryClient } from "@/lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import "./global.css";

export default function RootLayout() {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <Stack
          screenOptions={{
            headerStyle: {
              backgroundColor: "#fff",
            },
            headerTintColor: "#000",
            headerTitleStyle: {
              fontWeight: "bold",
            },
            // Untuk hide header di semua screen
            // headerShown: false,
          }}
        >
          {/* Customize per screen */}
          <Stack.Screen
            name="index"
            options={{
              title: "Todo Cak",
              headerStyle: { backgroundColor: "#000" },
              // headerShown: false, // Hide header untuk screen ini saja
            }}
          />
          <Stack.Screen
            name="auth/login"
            options={{
              title: "Masuk",
              headerShown: false,
            }}
          />
        </Stack>
      </QueryClientProvider>
    </AuthProvider>
  );
}
