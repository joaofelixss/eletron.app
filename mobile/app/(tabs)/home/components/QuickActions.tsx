import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../../../src/constants/colors";
import { useRouter } from "expo-router";

export const QuickActions = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      
      {/* BOTÃO PRIMÁRIO (COM FOGUETE FLUTUANTE) */}
      <TouchableOpacity 
        style={[styles.button, styles.primaryButton]} 
        activeOpacity={0.8}
        onPress={() => router.push("/sales/create")}
      >
        <View style={styles.contentRow}>
          <View style={styles.iconCircle}>
             <Ionicons name="add" size={22} color="#000" />
          </View>
          <Text style={styles.primaryText}>Novo Pedido</Text>
        </View>
        
        {/* O Foguete Flutuando Absoluto */}
        <View style={styles.floatingRocket}>
          <Text style={{ fontSize: 20 }}>🚀</Text>
        </View>
      </TouchableOpacity>

      {/* BOTÃO SECUNDÁRIO */}
      <TouchableOpacity 
        style={[styles.button, styles.secondaryButton]}
        activeOpacity={0.7}
        onPress={() => router.push("/clients/add")}
      >
        <Ionicons name="person-add-outline" size={20} color={colors.text.main} />
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
    height: 64, // Aumentei um pouquinho para caber melhor o foguete
    borderRadius: 18,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    position: "relative", // Necessário para o foguete absoluto funcionar
  },
  
  // ESTILOS DO BOTÃO PRIMÁRIO
  primaryButton: {
    backgroundColor: colors.primary,
    // Sombra
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  contentRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  iconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "rgba(255,255,255,0.4)", // Círculo um pouco mais visível
    justifyContent: "center",
    alignItems: "center",
  },
  primaryText: {
    fontFamily: "Poppins_700Bold",
    fontSize: 14,
    color: "#000",
  },

  // O FOGUETE FLUTUANTE
  floatingRocket: {
    position: "absolute",
    top: -9,      // Bem no topo
    right: -8,    // Bem na direita
    transform: [{ rotate: '15deg' }] // Leve inclinação para parecer que está voando
  },

  // ESTILOS DO BOTÃO SECUNDÁRIO
  secondaryButton: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    justifyContent: "center",
    gap: 8,
    // Sombra leve
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  secondaryText: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 14,
    color: colors.text.main,
  },
});