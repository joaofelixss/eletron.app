import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { colors } from "../src/constants/colors";
import { 
  useFonts, 
  Poppins_400Regular, 
  Poppins_600SemiBold, 
  Poppins_700Bold 
} from "@expo-google-fonts/poppins";
import { View, ActivityIndicator } from "react-native";
import { AuthProvider } from "../src/context/AuthContext";

export default function RootLayout() {
  // Carrega as fontes na memória
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  // Enquanto não carrega, mostra um spinner
  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: colors.background }}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <>
    <AuthProvider>
      <StatusBar style="dark" backgroundColor={colors.background} />
      <Stack 
        screenOptions={{ 
          headerShown: false, 
          contentStyle: { backgroundColor: colors.background } 
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="signup" /> {/* Pasta nova de cadastro */}
      </Stack>
    </AuthProvider>
    </>
  );
}