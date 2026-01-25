import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../../../src/constants/colors";
import { useRouter } from "expo-router";

const ProgressBar = ({ label, current, total }: any) => (
  <View style={{ marginBottom: 12 }}>
    <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 4 }}>
      <Text style={styles.progressLabel}>{label}</Text>
      <Text style={styles.progressValue}>{current} de {total}</Text>
    </View>
    <View style={styles.progressTrack}>
      <View 
        style={[
          styles.progressFill, 
          { width: `${(current / total) * 100}%`, backgroundColor: current >= total ? colors.danger : colors.primary }
        ]} 
      />
    </View>
  </View>
);

export const PlanStatusCard = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* CARD STATUS */}
      <View style={styles.card}>
        <View style={styles.header}>
          <Text style={styles.title}>Seu Plano</Text>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>GRÁTIS</Text>
          </View>
        </View>

        <ProgressBar label="Produtos" current={12} total={50} />
        <ProgressBar label="Categorias" current={3} total={10} />
        <ProgressBar label="Descrições com IA" current={1} total={5} />
        
        <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 8 }}>
          <Text style={styles.progressLabel}>Vendas Online</Text>
          <Text style={[styles.progressValue, { color: colors.success }]}>ILIMITADO</Text>
        </View>

        <TouchableOpacity 
          style={styles.upgradeButton}
          onPress={() => router.push("/subscription/plans")}
        >
          <Text style={styles.upgradeText}>Assinar um Plano</Text>
        </TouchableOpacity>
      </View>

      {/* BANNER FOGUETE */}
      <TouchableOpacity 
        style={styles.rocketCard}
        onPress={() => router.push("/subscription/plans")}
      >
        <View style={{ flex: 1 }}>
          <Text style={styles.rocketTitle}>Cresça com o ELETRON 🚀</Text>
          <Text style={styles.rocketSubtitle}>
            Desbloqueie IA ilimitada, gestão avançada e muito mais.
          </Text>
          <Text style={styles.rocketLink}>Ver Planos Premium</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginBottom: 40 },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 24,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontFamily: "Poppins_700Bold",
    fontSize: 16,
    color: colors.text.main,
  },
  badge: {
    backgroundColor: "#F3F4F6",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  badgeText: {
    fontFamily: "Poppins_700Bold",
    fontSize: 10,
    color: "#6B7280",
  },
  progressLabel: {
    fontFamily: "Poppins_500Medium",
    fontSize: 12,
    color: colors.text.body,
  },
  progressValue: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 12,
    color: colors.text.main,
  },
  progressTrack: {
    height: 6,
    backgroundColor: "#F3F4F6",
    borderRadius: 3,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 3,
  },
  upgradeButton: {
    marginTop: 20,
    backgroundColor: "#18181B",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  upgradeText: {
    fontFamily: "Poppins_700Bold",
    fontSize: 14,
    color: "#FFF",
  },

  // ROCKET CARD
  rocketCard: {
    backgroundColor: colors.primary, // Amarelo
    borderRadius: 16,
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  rocketTitle: {
    fontFamily: "Poppins_800ExtraBold",
    fontSize: 18,
    color: "#000",
    marginBottom: 4,
  },
  rocketSubtitle: {
    fontFamily: "Poppins_500Medium",
    fontSize: 12,
    color: "#333",
    marginBottom: 12,
  },
  rocketLink: {
    fontFamily: "Poppins_700Bold",
    fontSize: 12,
    color: "#000",
    textDecorationLine: "underline",
  },
});