import React from "react";
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StatusBar,
  Image
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../src/constants/colors";

export default function WelcomeBackScreen() {
  const router = useRouter();
  const { phone } = useLocalSearchParams(); // Recebe o telefone passado

  return (
    <View style={{ flex: 1, backgroundColor: colors.background, padding: 24, justifyContent: "space-between" }}>
      <StatusBar barStyle="dark-content" />

      <View style={{ marginTop: 60, alignItems: "center" }}>
        {/* Avatar Grande */}
        <View style={{ 
          width: 120, 
          height: 120, 
          borderRadius: 60, 
          padding: 4, 
          backgroundColor: "#FFF",
          borderWidth: 2,
          borderColor: colors.primary,
          marginBottom: 24,
          shadowColor: "#000",
          shadowOpacity: 0.1,
          shadowRadius: 10,
          elevation: 5
        }}>
          <Image 
            source={{ uri: "https://ui-avatars.com/api/?name=Joao+Silva&background=000&color=fff&size=256" }} 
            style={{ width: "100%", height: "100%", borderRadius: 100 }}
          />
          <View style={{
            position: "absolute",
            bottom: 0,
            right: 0,
            backgroundColor: colors.success,
            width: 32,
            height: 32,
            borderRadius: 16,
            justifyContent: "center",
            alignItems: "center",
            borderWidth: 3,
            borderColor: "#FFF"
          }}>
            <Ionicons name="checkmark" size={16} color="#FFF" />
          </View>
        </View>

        <Text style={{ fontFamily: "Poppins_700Bold", fontSize: 24, color: colors.text.main, marginBottom: 8 }}>
          Olá, João! 👋
        </Text>
        <Text style={{ fontFamily: "Poppins_400Regular", fontSize: 14, color: colors.text.body, textAlign: "center" }}>
          Identificamos sua conta vinculada ao número{"\n"}
          <Text style={{ fontFamily: "Poppins_600SemiBold" }}>{phone}</Text>
        </Text>
      </View>

      <View style={{ width: "100%", gap: 16, marginBottom: 20 }}>
        {/* Botão Entrar */}
        <TouchableOpacity 
          style={{
            backgroundColor: colors.primary,
            height: 56,
            borderRadius: 12,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            gap: 12,
            shadowColor: colors.primary,
            shadowOpacity: 0.3,
            shadowOffset: { width: 0, height: 4 },
            elevation: 5
          }}
          activeOpacity={0.8}
          onPress={() => router.replace("/(tabs)/home/home")} // Vai direto pra Home
        >
          <Text style={{ fontFamily: "Poppins_700Bold", fontSize: 16, color: colors.text.onPrimary }}>
            Acessar minha conta
          </Text>
          <Ionicons name="arrow-forward" size={20} color={colors.text.onPrimary} />
        </TouchableOpacity>

        <TouchableOpacity 
          onPress={() => router.back()}
          style={{ padding: 12, alignItems: "center" }}
        >
          <Text style={{ fontFamily: "Poppins_500Medium", color: colors.text.light }}>
            Não sou eu / Trocar conta
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}