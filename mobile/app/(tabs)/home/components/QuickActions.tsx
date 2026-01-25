import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../../../src/constants/colors";
import { useRouter } from "expo-router";

export const QuickActions = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={[styles.button, styles.primaryButton]} 
        onPress={() => router.push("/sales/create")}
      >
        <Ionicons name="add-circle" size={24} color="#000" />
        <Text style={styles.primaryText}>Novo Pedido</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={[styles.button, styles.secondaryButton]}
        onPress={() => router.push("/clients/add")}
      >
        <Ionicons name="person-add" size={20} color={colors.text.main} />
        <Text style={styles.secondaryText}>Novo Cliente</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 24,
  },
  button: {
    flex: 1,
    height: 56,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  primaryButton: {
    backgroundColor: colors.primary, // Amarelo
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  secondaryButton: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  primaryText: {
    fontFamily: "Poppins_700Bold",
    fontSize: 14,
    color: "#000",
  },
  secondaryText: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 14,
    color: colors.text.main,
  },
});