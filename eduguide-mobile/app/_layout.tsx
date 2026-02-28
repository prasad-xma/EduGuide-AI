import { Stack } from "expo-router";
import { AuthProvider } from "@/contexts/AuthContext";

export default function RootLayout() {
  return (
    // wrap with authProvider
    <AuthProvider>
      <Stack screenOptions={{ headerShown: false}} />
    </AuthProvider>
  );
}
