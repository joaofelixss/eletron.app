import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../../../src/constants/colors";

export const ShareStoreCard = () => {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          <Ionicons name="globe-outline" size={24} color="#FFF" />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.title}>Sua Loja Online</Text>
          <Text style={styles.subtitle}>Compartilhe com seus clientes</Text>
        </View>
      </View>

      <View style={styles.linkBox}>
        <Text style={styles.linkText} numberOfLines={1}>eletron.app/loja-do-joao</Text>
        <TouchableOpacity style={styles.copyButton}>
          <Text style={styles.copyText}>Copiar</Text>
          <Ionicons name="copy-outline" size={16} color="#000" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#18181B", // Dark card for highlight
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 16,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.1)",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontFamily: "Poppins_700Bold",
    fontSize: 16,
    color: "#FFF",
  },
  subtitle: {
    fontFamily: "Poppins_400Regular",
    fontSize: 12,
    color: "#A1A1AA",
  },
  linkBox: {
    flexDirection: "row",
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 12,
    padding: 4,
    paddingLeft: 12,
    alignItems: "center",
  },
  linkText: {
    flex: 1,
    fontFamily: "Poppins_400Regular",
    color: "#FFF",
    fontSize: 12,
  },
  copyButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  copyText: {
    fontFamily: "Poppins_700Bold",
    fontSize: 12,
    color: "#000",
  },
});