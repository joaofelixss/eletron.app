import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../src/constants/colors";

export default function ChatTabScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Ionicons name="chatbubbles-outline" size={80} color={colors.primary} />
      <Text style={styles.title}>Chat Eletron IA</Text>
      <Text style={styles.subtitle}>
        Seu assistente virtual de negócios estará disponível aqui em breve.
      </Text>
      
      <TouchableOpacity 
        style={styles.button}
        onPress={() => router.push("/marketing")} // Atalho para a tela de marketing se quiser testar
      >
        <Text style={styles.buttonText}>Ir para Marketing</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  title: {
    fontFamily: "Poppins_700Bold",
    fontSize: 24,
    color: colors.text.main,
    marginTop: 16,
  },
  subtitle: {
    fontFamily: "Poppins_400Regular",
    fontSize: 14,
    color: colors.text.body,
    textAlign: "center",
    marginTop: 8,
    marginBottom: 32,
  },
  button: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    backgroundColor: colors.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  buttonText: {
    fontFamily: "Poppins_600SemiBold",
    color: colors.text.main,
  }
});